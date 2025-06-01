package com.ecommerce.controller;

import com.ecommerce.model.Cart;
import com.ecommerce.model.CartItem;
import com.ecommerce.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class CartController {

    private final CartService cartService;

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Get current user's cart")
    public ResponseEntity<Cart> getCart() {
        return ResponseEntity.ok(cartService.getCurrentUserCart());
    }

    @PostMapping("/items")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Add item to cart")
    public ResponseEntity<Cart> addItemToCart(@Valid @RequestBody CartItemRequest request) {
        return ResponseEntity.ok(cartService.addItemToCart(request.getProductId(), request.getQuantity()));
    }

    @PutMapping("/items/{itemId}")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Update cart item quantity")
    public ResponseEntity<Cart> updateCartItemQuantity(
            @PathVariable Long itemId,
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.updateCartItemQuantity(itemId, quantity));
    }

    @DeleteMapping("/items/{itemId}")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Remove item from cart")
    public ResponseEntity<Cart> removeItemFromCart(@PathVariable Long itemId) {
        return ResponseEntity.ok(cartService.removeItemFromCart(itemId));
    }

    @DeleteMapping
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Clear cart")
    public ResponseEntity<Void> clearCart() {
        cartService.clearCart();
        return ResponseEntity.ok().build();
    }

    @Data
    public static class CartItemRequest {
        @NotNull(message = "Product ID is required")
        private Long productId;

        @NotNull(message = "Quantity is required")
        @Min(value = 1, message = "Quantity must be at least 1")
        private Integer quantity;
    }
} 