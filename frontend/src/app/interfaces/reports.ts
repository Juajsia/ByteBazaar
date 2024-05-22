export interface Sales {
    name: string,
    series: Array<{
        name: string,
        value: number
    }>
}

export interface AdditionalSalesInfo {
    avg_order_value: string,
    avg_num_products_per_order: string,
    avg_num_orders_per_client: string
}

export interface simpleChartInfo {
    name: string,
    value: number
}