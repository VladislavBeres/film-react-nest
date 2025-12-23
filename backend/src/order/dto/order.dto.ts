export class OrderItemDto {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export class CreateOrderDto {
  email: string;
  phone: string;
  tickets: OrderItemDto[];
}

export class OrderResponseItemDto extends OrderItemDto {
  id: string;
}

export class OrderResponseDto {
  total: number;
  items: OrderResponseItemDto[];
}
