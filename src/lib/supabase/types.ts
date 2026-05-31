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
      rabbis: {
        Row: {
          id: string
          name_he: string
          name_en: string
          bio_he: string | null
          bio_en: string | null
          photo_url: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name_he: string
          name_en: string
          bio_he?: string | null
          bio_en?: string | null
          photo_url?: string | null
          is_active?: boolean
        }
        Update: {
          name_he?: string
          name_en?: string
          bio_he?: string | null
          bio_en?: string | null
          photo_url?: string | null
          is_active?: boolean
        }
      }
      categories: {
        Row: {
          id: string
          slug: string
          name_he: string
          name_en: string
          description_he: string | null
          description_en: string | null
          icon: string
          display_order: number
          is_active: boolean
        }
        Insert: {
          id?: string
          slug: string
          name_he: string
          name_en: string
          description_he?: string | null
          description_en?: string | null
          icon: string
          display_order?: number
          is_active?: boolean
        }
        Update: {
          slug?: string
          name_he?: string
          name_en?: string
          description_he?: string | null
          description_en?: string | null
          icon?: string
          display_order?: number
          is_active?: boolean
        }
      }
      lessons: {
        Row: {
          id: string
          title_he: string
          title_en: string
          content_he: string
          content_en: string
          summary_he: string | null
          summary_en: string | null
          youtube_id: string | null
          audio_url: string | null
          parasha: string | null
          category_id: string | null
          rabbi_id: string | null
          lesson_date: string
          is_free: boolean
          estimated_minutes: number
          created_at: string
        }
        Insert: {
          id?: string
          title_he: string
          title_en: string
          content_he: string
          content_en: string
          summary_he?: string | null
          summary_en?: string | null
          youtube_id?: string | null
          audio_url?: string | null
          parasha?: string | null
          category_id?: string | null
          rabbi_id?: string | null
          lesson_date: string
          is_free?: boolean
          estimated_minutes?: number
        }
        Update: {
          title_he?: string
          title_en?: string
          content_he?: string
          content_en?: string
          summary_he?: string | null
          summary_en?: string | null
          youtube_id?: string | null
          audio_url?: string | null
          parasha?: string | null
          category_id?: string | null
          rabbi_id?: string | null
          is_free?: boolean
          estimated_minutes?: number
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
      achievements: {
        Row: {
          id: string
          slug: string
          name_he: string
          name_en: string
          description_he: string
          description_en: string
          icon: string
          condition_type: 'streak' | 'total_lessons' | 'first_lesson' | 'share'
          condition_value: number
        }
        Insert: {
          id?: string
          slug: string
          name_he: string
          name_en: string
          description_he: string
          description_en: string
          icon: string
          condition_type: 'streak' | 'total_lessons' | 'first_lesson' | 'share'
          condition_value?: number
        }
        Update: {
          name_he?: string
          name_en?: string
          description_he?: string
          description_en?: string
          icon?: string
          condition_type?: 'streak' | 'total_lessons' | 'first_lesson' | 'share'
          condition_value?: number
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          earned_at?: string
        }
        Update: never
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Subscription = Database['public']['Tables']['subscriptions']['Row']
export type Rabbi = Database['public']['Tables']['rabbis']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Lesson = Database['public']['Tables']['lessons']['Row']
export type LessonCompletion = Database['public']['Tables']['lesson_completions']['Row']
export type DonationAllocation = Database['public']['Tables']['donation_allocations']['Row']
export type Achievement = Database['public']['Tables']['achievements']['Row']
export type UserAchievement = Database['public']['Tables']['user_achievements']['Row']
export type Currency = 'ILS' | 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD'

export type LessonWithDetails = Lesson & {
  categories?: Category | null
  rabbis?: Rabbi | null
}

export type UserAchievementWithDetails = UserAchievement & {
  achievements: Achievement
}
