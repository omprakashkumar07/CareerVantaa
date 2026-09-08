-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: webhook_events (for idempotency)
create table if not exists webhook_events (
  id uuid primary key default uuid_generate_v4(),
  event_id text unique not null,
  event_type text not null,
  payload jsonb not null,
  processed_at timestamp with time zone default now()
);

-- Table: orders
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  access_token uuid unique not null default uuid_generate_v4(),
  razorpay_payment_link_id text not null,
  razorpay_payment_id text not null unique,
  razorpay_order_id text,
  product_id text not null,
  product_name text not null,
  amount integer not null,
  currency text not null,
  status text not null,
  customer_name text,
  customer_email text,
  customer_phone text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Table: entitlements
create table if not exists entitlements (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade not null,
  product_id text not null,
  created_at timestamp with time zone default now()
);

-- Indexes for fast lookups
create index if not exists idx_orders_razorpay_payment_id on orders(razorpay_payment_id);
create index if not exists idx_orders_access_token on orders(access_token);
create index if not exists idx_entitlements_order_id on entitlements(order_id);

-- Enable Row Level Security (RLS) on all tables to strictly DENY public access
alter table webhook_events enable row level security;
alter table orders enable row level security;
alter table entitlements enable row level security;

-- Storage Bucket setup (Note: Supabase manages buckets via SQL too)
insert into storage.buckets (id, name, public) 
values ('careervantaa-products', 'careervantaa-products', false)
on conflict (id) do nothing;

-- Ensure the bucket is private (RLS on storage.objects)
-- Edge Functions bypass RLS because they use the Service Role key.
