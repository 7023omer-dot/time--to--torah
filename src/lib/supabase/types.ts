export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          preferred_language: 'he' | 'en'
          preferred_currency: 'ILS' | 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD'
          stripe_customer_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          preferred_language?: 'he' | 'en'
          preferred_currency?: 'ILS' | 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD'
          stripe_customer_id?: string | null
        }
        Update: {
          full_name?: string | null
          avatar_url?: string | null
          preferred_language?: 'he' | 'en'
          preferred_currency?: 'ILS' | 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD'
          stripe_customer_id?: string | null
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_subscription_id: string
          stripe_price_id: string
          plan: 'monthly' | 'biannual' | 'annual'
          currency: string
          amount_cents: number
          status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete'
          donation_target: 'yeshiva' | 'poor_families' | 'split_50_50'
          current_period_start: string | null
          current_period_end: string | null
          canceled_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_subscription_id: string
          stripe_price_id: string
          plan: 'monthly' | 'biannual' | 'annual'
          currency: string
          amount_cents: number
          status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete'
          donation_target: 'yeshiva' | 'poor_families' | 'split_50_50'
          current_period_start?: string | null
          current_period_end?: string | null
        }
        Update: {
          status?: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete'
          donation_target?: 'yeshiva' | 'poor_families' | 'split_50_50'
          current_period_start?: string | null
          current_period_end?: string | null
          canceled_at?: string | null
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          title_he: string
          title_en: string
          content_he: string
          content_en: string
          youtube_id: string | null
          parasha: string | null
          category: 'parasha' | 'halacha' | 'machshava' | 'gemara' | 'mussar' | null
          lesson_date: string
          is_free: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title_he: string
          title_en: string
          content_he: string
          content_en: string
          youtube_id?: string | null
          parasha?: string | null
          category?: 'parasha' | 'halacha' | 'machshava' | 'gemara' | 'mussar' | null
          lesson_date: string
          is_free?: boolean
        }
        Update: {
          title_he?: string
          title_en?: string
          content_he?: string
          content_en?: string
          youtube_id?: string | null
          parasha?: string | null
          category?: 'parasha' | 'halacha' | 'machshava' | 'gemara' | 'mussar' | null
          is_free?: boolean
        }
      }
      lesson_completions: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          completed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          completed_at?: string
        }
        Update: never
      }
      donation_allocations: {
        Row: {
          id: string
          user_id: string
          subscription_id: string
          stripe_invoice_id: string
          amount_cents: number
          currency: string
          yeshiva_cents: number
          poor_families_cents: number
          payment_date: string
        }
        Insert: {
          id?: string
          user_id: string
          subscription_id: string
          stripe_invoice_id: string
          amount_cents: number
          currency: string
          yeshiva_cents: number
          poor_families_cents: number
          payment_date?: string
        }
        Update: never
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Subscription = Database['public']['Tables']['subscriptions']['Row']
export type Lesson = Database['public']['Tables']['lessons']['Row']
export type LessonCompletion = Database['public']['Tables']['lesson_completions']['Row']
export type DonationAllocation = Database['public']['Tables']['donation_allocations']['Row']
export type Currency = 'ILS' | 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD'
