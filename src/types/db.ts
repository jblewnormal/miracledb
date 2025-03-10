import type { Database } from 'database.types';

export type Miracle = Database['public']['Tables']['miracles']['Row'];
export type Comment = Database['public']['Tables']['comments']['Row'];
export type Like = Database['public']['Tables']['likes']['Row'];
export type AnalyticsEvent = Database['public']['Tables']['analytics_events']['Row'];
