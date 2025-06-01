package com.ecommerce.service;

import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.model.*;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CartService cartService;

    @Transactional
    public Order createOrderFromCart(String shippingAddress, String paymentMethod) {
        User currentUser = getCurrentUser();
        Cart cart = currentUser.getCart();
        
        if (cart == null || cart.getItems().isEmpty()) {
            throw new IllegalStateException("Cannot create order from empty cart");
        }

        Order order = new Order(currentUser, shippingAddress, paymentMethod);
        order.setStatus(Order.OrderStatus.PENDING);
        order.setTotalAmount(cart.getTotalAmount());

        // Convert cart items to order items
        cart.getItems().forEach(cartItem -> {
            OrderItem orderItem = new OrderItem(
                order,
                cartItem.getProduct(),
                cartItem.getQuantity(),
                cartItem.getProduct().getPrice()
            );
            order.addItem(orderItem);
        });

        // Clear the cart
        cartService.clearCart();

        return orderRepository.save(order);
    }

    public List<Order> getCurrentUserOrders() {
        User currentUser = getCurrentUser();
        return orderRepository.findByUserOrderByCreatedAtDesc(currentUser);
    }

    public Order getOrderById(Long orderId) {
        User currentUser = getCurrentUser();
        return orderRepository.findByIdAndUser(orderId, currentUser)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
    }

    @Transactional
    public Order cancelOrder(Long orderId) {
        Order order = getOrderById(orderId);
        
        if (order.getStatus() != Order.OrderStatus.PENDING) {
            throw new IllegalStateException("Only pending orders can be cancelled");
        }

        order.setStatus(Order.OrderStatus.CANCELLED);
        order.setPaymentStatus(Order.PaymentStatus.REFUNDED);
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        try {
            Order.OrderStatus newStatus = Order.OrderStatus.valueOf(status.toUpperCase());
            order.setStatus(newStatus);
            return orderRepository.save(order);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid order status: " + status);
        }
    }

    @Transactional
    public Order updatePaymentStatus(Long orderId, String status, String stripePaymentId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        try {
            Order.PaymentStatus newStatus = Order.PaymentStatus.valueOf(status.toUpperCase());
            order.setPaymentStatus(newStatus);
            order.setStripePaymentId(stripePaymentId);
            return orderRepository.save(order);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid payment status: " + status);
        }
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
} 