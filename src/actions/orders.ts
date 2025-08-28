/*
================================================================================
 FILE: src/actions/orders.ts (UPDATE THIS FILE)
 DESC: This Server Action is updated to correctly use the async server client.
================================================================================
*/
"use server";

import { createClient } from "@/lib/supabase/server";

interface OrderItem {
    book_id: number;
    quantity: number;
    price: number;
}

interface OrderData {
    userId: string;
    totalPrice: number;
    items: OrderItem[];
}

export async function createOrder(orderData: OrderData) {
    // FIX: Await the createClient() function and remove the cookieStore argument.
    const supabase = await createClient();

    // Step 1: Insert the main order to get an order ID
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
            user_id: orderData.userId,
            total_price: orderData.totalPrice,
        })
        .select()
        .single();

    if (orderError) {
        console.error("Error creating order:", orderError);
        return { success: false, error: orderError.message };
    }

    // Step 2: Prepare the order items with the new order ID
    const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        book_id: item.book_id,
        quantity: item.quantity,
        price: item.price,
    }));

    // Step 3: Insert all order items
    const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

    if (itemsError) {
        console.error("Error creating order items:", itemsError);
        // Optional: Delete the order if items fail to insert
        await supabase.from('orders').delete().eq('id', order.id);
        return { success: false, error: itemsError.message };
    }

    return { success: true, orderId: order.id };
}
