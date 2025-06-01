package com.ecommerce.controller;

import com.ecommerce.model.Order;
import com.ecommerce.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Create a new order from cart")
    public ResponseEntity<Order> createOrder(
            @RequestParam String shippingAddress,
            @RequestParam String paymentMethod) {
        return ResponseEntity.ok(orderService.createOrderFromCart(shippingAddress, paymentMethod));
    }

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Get all orders for the current user")
    public ResponseEntity<List<Order>> getUserOrders() {
        return ResponseEntity.ok(orderService.getCurrentUserOrders());
    }

    @GetMapping("/{orderId}")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Get order details by ID")
    public ResponseEntity<Order> getOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }

    @PutMapping("/{orderId}/cancel")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Cancel an order")
    public ResponseEntity<Order> cancelOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.cancelOrder(orderId));
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all orders (Admin only)")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/admin/{orderId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update order status (Admin only)")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam String status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, status));
    }

    @PutMapping("/{orderId}/payment")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Update payment status")
    public ResponseEntity<Order> updatePaymentStatus(
            @PathVariable Long orderId,
            @RequestParam String status,
            @RequestParam(required = false) String stripePaymentId) {
        return ResponseEntity.ok(orderService.updatePaymentStatus(orderId, status, stripePaymentId));
    }
} 