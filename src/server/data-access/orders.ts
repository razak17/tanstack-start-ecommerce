import { and, asc, count, countDistinct, desc, eq, lte, sql } from 'drizzle-orm'

import { db } from '@/server/db'
import { categories, orders, products } from '@/server/db/schema'

export async function getDashboardStats() {
  try {
    const [
      totalProductsResult,
      totalOrdersResult,
      totalRevenueResult,
      totalCustomersResult,
      lowInventoryResult,
      recentOrdersResult,
    ] = await Promise.all([
      // Total products
      db
        .select({ count: count(products.id) })
        .from(products)
        .where(eq(products.status, 'active')),

      // Total orders
      db
        .select({ count: count(orders.id) })
        .from(orders),

      // Total revenue
      db
        .select({ total: sql<number>`COALESCE(SUM(${orders.amount}), 0)` })
        .from(orders),

      // Total customers
      db
        .select({ count: countDistinct(orders.email) })
        .from(orders),

      // Low inventory products
      db
        .select({
          id: products.id,
          name: products.name,
          inventory: products.inventory,
          category: categories.name,
        })
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .where(and(eq(products.status, 'active'), lte(products.inventory, 10)))
        .orderBy(asc(products.inventory))
        .limit(5),

      // Recent orders
      db
        .select({
          id: orders.id,
          email: orders.email,
          name: orders.name,
          amount: orders.amount,
          status: orders.stripePaymentIntentStatus,
          createdAt: orders.createdAt,
        })
        .from(orders)
        .orderBy(desc(orders.createdAt))
        .limit(5),
    ])

    return {
      totalProducts: totalProductsResult[0]?.count ?? 0,
      totalOrders: totalOrdersResult[0]?.count ?? 0,
      totalRevenue: totalRevenueResult[0]?.total ?? 0,
      totalCustomers: totalCustomersResult[0]?.count ?? 0,
      lowInventoryProducts: lowInventoryResult,
      recentOrders: recentOrdersResult,
    }
  } catch (err) {
    console.error(err)
    return {
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      totalCustomers: 0,
      lowInventoryProducts: [],
      recentOrders: [],
    }
  }
}
