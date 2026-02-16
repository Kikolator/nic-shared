// AUTO-GENERATED — DO NOT EDIT
// Generated from nic-supabase schema. Re-run type generation after any schema change.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      savage_bookings: {
        Row: {
          amount_cents: number | null
          cancel_reason: string | null
          cancelled_at: string | null
          checked_in_at: string | null
          created_at: string | null
          end_time: string
          id: string
          recurring_rule_id: string | null
          resource_id: string
          start_time: string
          status: Database["public"]["Enums"]["savage_booking_status"]
          stripe_session_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount_cents?: number | null
          cancel_reason?: string | null
          cancelled_at?: string | null
          checked_in_at?: string | null
          created_at?: string | null
          end_time: string
          id?: string
          recurring_rule_id?: string | null
          resource_id: string
          start_time: string
          status?: Database["public"]["Enums"]["savage_booking_status"]
          stripe_session_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount_cents?: number | null
          cancel_reason?: string | null
          cancelled_at?: string | null
          checked_in_at?: string | null
          created_at?: string | null
          end_time?: string
          id?: string
          recurring_rule_id?: string | null
          resource_id?: string
          start_time?: string
          status?: Database["public"]["Enums"]["savage_booking_status"]
          stripe_session_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "savage_bookings_recurring_rule_id_fkey"
            columns: ["recurring_rule_id"]
            isOneToOne: false
            referencedRelation: "savage_recurring_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "savage_bookings_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "savage_resources"
            referencedColumns: ["id"]
          },
        ]
      }
      savage_credits: {
        Row: {
          amount_minutes: number
          balance_after: number
          booking_id: string | null
          created_at: string | null
          credit_type: Database["public"]["Enums"]["savage_credit_type"]
          description: string | null
          id: string
          period_end: string | null
          period_start: string | null
          source: Database["public"]["Enums"]["savage_credit_source"]
          user_id: string
        }
        Insert: {
          amount_minutes: number
          balance_after: number
          booking_id?: string | null
          created_at?: string | null
          credit_type: Database["public"]["Enums"]["savage_credit_type"]
          description?: string | null
          id?: string
          period_end?: string | null
          period_start?: string | null
          source: Database["public"]["Enums"]["savage_credit_source"]
          user_id: string
        }
        Update: {
          amount_minutes?: number
          balance_after?: number
          booking_id?: string | null
          created_at?: string | null
          credit_type?: Database["public"]["Enums"]["savage_credit_type"]
          description?: string | null
          id?: string
          period_end?: string | null
          period_start?: string | null
          source?: Database["public"]["Enums"]["savage_credit_source"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "savage_credits_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "savage_bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      savage_daily_stats: {
        Row: {
          active_passes: number | null
          check_ins: number | null
          date: string
          desk_occupancy: number | null
          generated_at: string | null
          id: string
          room_bookings: number | null
        }
        Insert: {
          active_passes?: number | null
          check_ins?: number | null
          date: string
          desk_occupancy?: number | null
          generated_at?: string | null
          id?: string
          room_bookings?: number | null
        }
        Update: {
          active_passes?: number | null
          check_ins?: number | null
          date?: string
          desk_occupancy?: number | null
          generated_at?: string | null
          id?: string
          room_bookings?: number | null
        }
        Relationships: []
      }
      savage_leads: {
        Row: {
          admin_notes: string | null
          archived_at: string | null
          company: string | null
          converted_user_id: string | null
          created_at: string | null
          email: string
          follow_up_count: number | null
          full_name: string | null
          id: string
          last_contacted_at: string | null
          phone: string | null
          source: string | null
          status: Database["public"]["Enums"]["savage_lead_status"]
          trial_confirmed: boolean | null
          trial_date: string | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          archived_at?: string | null
          company?: string | null
          converted_user_id?: string | null
          created_at?: string | null
          email: string
          follow_up_count?: number | null
          full_name?: string | null
          id?: string
          last_contacted_at?: string | null
          phone?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["savage_lead_status"]
          trial_confirmed?: boolean | null
          trial_date?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          archived_at?: string | null
          company?: string | null
          converted_user_id?: string | null
          created_at?: string | null
          email?: string
          follow_up_count?: number | null
          full_name?: string | null
          id?: string
          last_contacted_at?: string | null
          phone?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["savage_lead_status"]
          trial_confirmed?: boolean | null
          trial_date?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      savage_members: {
        Row: {
          access_level: Database["public"]["Enums"]["savage_access_level"]
          admin_notes: string | null
          alarm_approved: boolean | null
          cancel_requested_at: string | null
          cancelled_at: string | null
          company: string | null
          created_at: string | null
          fixed_desk_id: string | null
          has_twenty_four_seven: boolean | null
          id: string
          joined_at: string | null
          nuki_code: string | null
          paused_at: string | null
          plan: Database["public"]["Enums"]["savage_plan_type"]
          role_title: string | null
          status: Database["public"]["Enums"]["savage_member_status"]
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_level?: Database["public"]["Enums"]["savage_access_level"]
          admin_notes?: string | null
          alarm_approved?: boolean | null
          cancel_requested_at?: string | null
          cancelled_at?: string | null
          company?: string | null
          created_at?: string | null
          fixed_desk_id?: string | null
          has_twenty_four_seven?: boolean | null
          id?: string
          joined_at?: string | null
          nuki_code?: string | null
          paused_at?: string | null
          plan: Database["public"]["Enums"]["savage_plan_type"]
          role_title?: string | null
          status?: Database["public"]["Enums"]["savage_member_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_level?: Database["public"]["Enums"]["savage_access_level"]
          admin_notes?: string | null
          alarm_approved?: boolean | null
          cancel_requested_at?: string | null
          cancelled_at?: string | null
          company?: string | null
          created_at?: string | null
          fixed_desk_id?: string | null
          has_twenty_four_seven?: boolean | null
          id?: string
          joined_at?: string | null
          nuki_code?: string | null
          paused_at?: string | null
          plan?: Database["public"]["Enums"]["savage_plan_type"]
          role_title?: string | null
          status?: Database["public"]["Enums"]["savage_member_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "savage_members_fixed_desk_id_fkey"
            columns: ["fixed_desk_id"]
            isOneToOne: false
            referencedRelation: "savage_resources"
            referencedColumns: ["id"]
          },
        ]
      }
      savage_monthly_stats: {
        Row: {
          avg_desk_occupancy: number | null
          avg_room_utilisation: number | null
          churned_members: number | null
          day_passes_sold: number | null
          generated_at: string | null
          id: string
          leads_converted: number | null
          leads_created: number | null
          members_by_plan: Json | null
          month: string
          mrr_cents: number | null
          new_members: number | null
          peak_hour: number | null
          total_members: number | null
          total_revenue_cents: number | null
          variable_revenue_cents: number | null
          week_passes_sold: number | null
        }
        Insert: {
          avg_desk_occupancy?: number | null
          avg_room_utilisation?: number | null
          churned_members?: number | null
          day_passes_sold?: number | null
          generated_at?: string | null
          id?: string
          leads_converted?: number | null
          leads_created?: number | null
          members_by_plan?: Json | null
          month: string
          mrr_cents?: number | null
          new_members?: number | null
          peak_hour?: number | null
          total_members?: number | null
          total_revenue_cents?: number | null
          variable_revenue_cents?: number | null
          week_passes_sold?: number | null
        }
        Update: {
          avg_desk_occupancy?: number | null
          avg_room_utilisation?: number | null
          churned_members?: number | null
          day_passes_sold?: number | null
          generated_at?: string | null
          id?: string
          leads_converted?: number | null
          leads_created?: number | null
          members_by_plan?: Json | null
          month?: string
          mrr_cents?: number | null
          new_members?: number | null
          peak_hour?: number | null
          total_members?: number | null
          total_revenue_cents?: number | null
          variable_revenue_cents?: number | null
          week_passes_sold?: number | null
        }
        Relationships: []
      }
      savage_passes: {
        Row: {
          amount_cents: number
          assigned_desk_id: string | null
          created_at: string | null
          end_date: string
          id: string
          pass_type: Database["public"]["Enums"]["savage_pass_type"]
          start_date: string
          status: Database["public"]["Enums"]["savage_pass_status"]
          stripe_session_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount_cents: number
          assigned_desk_id?: string | null
          created_at?: string | null
          end_date: string
          id?: string
          pass_type: Database["public"]["Enums"]["savage_pass_type"]
          start_date: string
          status?: Database["public"]["Enums"]["savage_pass_status"]
          stripe_session_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount_cents?: number
          assigned_desk_id?: string | null
          created_at?: string | null
          end_date?: string
          id?: string
          pass_type?: Database["public"]["Enums"]["savage_pass_type"]
          start_date?: string
          status?: Database["public"]["Enums"]["savage_pass_status"]
          stripe_session_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "savage_passes_assigned_desk_id_fkey"
            columns: ["assigned_desk_id"]
            isOneToOne: false
            referencedRelation: "savage_resources"
            referencedColumns: ["id"]
          },
        ]
      }
      savage_payment_events: {
        Row: {
          created_at: string | null
          error: string | null
          event_type: string
          id: string
          payload: Json
          processed: boolean | null
          stripe_customer_id: string | null
          stripe_event_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          error?: string | null
          event_type: string
          id?: string
          payload: Json
          processed?: boolean | null
          stripe_customer_id?: string | null
          stripe_event_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          error?: string | null
          event_type?: string
          id?: string
          payload?: Json
          processed?: boolean | null
          stripe_customer_id?: string | null
          stripe_event_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      savage_products: {
        Row: {
          active: boolean | null
          category: Database["public"]["Enums"]["savage_product_category"]
          created_at: string | null
          currency: string
          description: string | null
          desk_hours: number | null
          id: string
          iva_rate: number
          meeting_hours: number | null
          name: string
          plan_type: Database["public"]["Enums"]["savage_plan_type"] | null
          price_cents: number
          slug: string
          sort_order: number | null
          stripe_price_id: string | null
          stripe_product_id: string | null
          updated_at: string | null
          visible_to_non_members: boolean | null
          visible_to_plans:
            | Database["public"]["Enums"]["savage_plan_type"][]
            | null
        }
        Insert: {
          active?: boolean | null
          category: Database["public"]["Enums"]["savage_product_category"]
          created_at?: string | null
          currency?: string
          description?: string | null
          desk_hours?: number | null
          id?: string
          iva_rate?: number
          meeting_hours?: number | null
          name: string
          plan_type?: Database["public"]["Enums"]["savage_plan_type"] | null
          price_cents: number
          slug: string
          sort_order?: number | null
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          updated_at?: string | null
          visible_to_non_members?: boolean | null
          visible_to_plans?:
            | Database["public"]["Enums"]["savage_plan_type"][]
            | null
        }
        Update: {
          active?: boolean | null
          category?: Database["public"]["Enums"]["savage_product_category"]
          created_at?: string | null
          currency?: string
          description?: string | null
          desk_hours?: number | null
          id?: string
          iva_rate?: number
          meeting_hours?: number | null
          name?: string
          plan_type?: Database["public"]["Enums"]["savage_plan_type"] | null
          price_cents?: number
          slug?: string
          sort_order?: number | null
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          updated_at?: string | null
          visible_to_non_members?: boolean | null
          visible_to_plans?:
            | Database["public"]["Enums"]["savage_plan_type"][]
            | null
        }
        Relationships: []
      }
      savage_recurring_rules: {
        Row: {
          active: boolean | null
          created_at: string | null
          day_of_week: number | null
          end_time: string
          id: string
          pattern: Database["public"]["Enums"]["savage_recurrence_pattern"]
          resource_id: string
          start_time: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          day_of_week?: number | null
          end_time: string
          id?: string
          pattern: Database["public"]["Enums"]["savage_recurrence_pattern"]
          resource_id: string
          start_time: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          day_of_week?: number | null
          end_time?: string
          id?: string
          pattern?: Database["public"]["Enums"]["savage_recurrence_pattern"]
          resource_id?: string
          start_time?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "savage_recurring_rules_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "savage_resources"
            referencedColumns: ["id"]
          },
        ]
      }
      savage_resources: {
        Row: {
          capacity: number | null
          created_at: string | null
          floor: number | null
          id: string
          metadata: Json | null
          name: string
          resource_type: Database["public"]["Enums"]["savage_resource_type"]
          sort_order: number | null
          status: Database["public"]["Enums"]["savage_resource_status"]
          updated_at: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          floor?: number | null
          id?: string
          metadata?: Json | null
          name: string
          resource_type: Database["public"]["Enums"]["savage_resource_type"]
          sort_order?: number | null
          status?: Database["public"]["Enums"]["savage_resource_status"]
          updated_at?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          floor?: number | null
          id?: string
          metadata?: Json | null
          name?: string
          resource_type?: Database["public"]["Enums"]["savage_resource_type"]
          sort_order?: number | null
          status?: Database["public"]["Enums"]["savage_resource_status"]
          updated_at?: string | null
        }
        Relationships: []
      }
      shared_admins: {
        Row: {
          app: Database["public"]["Enums"]["app_type"]
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          app: Database["public"]["Enums"]["app_type"]
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          app?: Database["public"]["Enums"]["app_type"]
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      shared_perk_redemptions: {
        Row: {
          context: Json | null
          id: string
          perk_id: string
          redeemed_at: string | null
          user_id: string
        }
        Insert: {
          context?: Json | null
          id?: string
          perk_id: string
          redeemed_at?: string | null
          user_id: string
        }
        Update: {
          context?: Json | null
          id?: string
          perk_id?: string
          redeemed_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shared_perk_redemptions_perk_id_fkey"
            columns: ["perk_id"]
            isOneToOne: false
            referencedRelation: "shared_perks"
            referencedColumns: ["id"]
          },
        ]
      }
      shared_perks: {
        Row: {
          active: boolean | null
          conditions: Json | null
          created_at: string | null
          description: string | null
          discount_type: string
          discount_value: number | null
          id: string
          name: string
          source_app: Database["public"]["Enums"]["app_type"]
          target_app: Database["public"]["Enums"]["app_type"]
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          conditions?: Json | null
          created_at?: string | null
          description?: string | null
          discount_type: string
          discount_value?: number | null
          id?: string
          name: string
          source_app: Database["public"]["Enums"]["app_type"]
          target_app: Database["public"]["Enums"]["app_type"]
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          conditions?: Json | null
          created_at?: string | null
          description?: string | null
          discount_type?: string
          discount_value?: number | null
          id?: string
          name?: string
          source_app?: Database["public"]["Enums"]["app_type"]
          target_app?: Database["public"]["Enums"]["app_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      shared_profiles: {
        Row: {
          avatar_url: string | null
          billing_address_line1: string | null
          billing_address_line2: string | null
          billing_city: string | null
          billing_country: string | null
          billing_postal_code: string | null
          billing_province: string | null
          created_at: string | null
          email: string
          fiscal_id: string | null
          fiscal_id_type: Database["public"]["Enums"]["fiscal_id_type"] | null
          full_name: string | null
          id: string
          phone: string | null
          preferred_lang: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address_line1?: string | null
          billing_address_line2?: string | null
          billing_city?: string | null
          billing_country?: string | null
          billing_postal_code?: string | null
          billing_province?: string | null
          created_at?: string | null
          email: string
          fiscal_id?: string | null
          fiscal_id_type?: Database["public"]["Enums"]["fiscal_id_type"] | null
          full_name?: string | null
          id: string
          phone?: string | null
          preferred_lang?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          billing_address_line1?: string | null
          billing_address_line2?: string | null
          billing_city?: string | null
          billing_country?: string | null
          billing_postal_code?: string | null
          billing_province?: string | null
          created_at?: string | null
          email?: string
          fiscal_id?: string | null
          fiscal_id_type?: Database["public"]["Enums"]["fiscal_id_type"] | null
          full_name?: string | null
          id?: string
          phone?: string | null
          preferred_lang?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      savage_auto_assign_desk: { Args: { p_pass_id: string }; Returns: string }
      savage_deduct_credits: {
        Args: {
          p_booking_id?: string
          p_credit_type: Database["public"]["Enums"]["savage_credit_type"]
          p_minutes: number
          p_user_id: string
        }
        Returns: boolean
      }
      savage_get_credit_balance: {
        Args: {
          p_credit_type: Database["public"]["Enums"]["savage_credit_type"]
          p_user_id: string
        }
        Returns: number
      }
      savage_get_desk_availability: {
        Args: { p_date: string }
        Returns: number
      }
      savage_get_room_availability: {
        Args: { p_date: string; p_resource_id: string }
        Returns: {
          slot_end: string
          slot_start: string
        }[]
      }
    }
    Enums: {
      app_type: "savage" | "musa" | "listy"
      fiscal_id_type: "nif" | "nie" | "passport" | "cif"
      savage_access_level: "none" | "business_hours" | "twenty_four_seven"
      savage_booking_status:
        | "pending_payment"
        | "confirmed"
        | "checked_in"
        | "completed"
        | "cancelled"
        | "no_show"
      savage_credit_source: "monthly_allowance" | "purchased" | "complimentary"
      savage_credit_type: "desk" | "meeting_room"
      savage_lead_status:
        | "new"
        | "confirmed"
        | "completed"
        | "follow_up"
        | "converted"
        | "lost"
      savage_member_status:
        | "active"
        | "paused"
        | "past_due"
        | "cancelled"
        | "churned"
      savage_pass_status:
        | "pending_payment"
        | "active"
        | "used"
        | "cancelled"
        | "expired"
      savage_pass_type: "day" | "week"
      savage_plan_type:
        | "checkpoint"
        | "connector"
        | "explorer"
        | "nomad"
        | "all_star"
      savage_product_category:
        | "subscription"
        | "pass"
        | "room_booking"
        | "hour_bundle"
        | "addon"
        | "guest_pass"
      savage_recurrence_pattern: "daily" | "weekly" | "biweekly"
      savage_resource_status: "available" | "occupied" | "out_of_service"
      savage_resource_type: "desk" | "meeting_room" | "podcast_room"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      app_type: ["savage", "musa", "listy"],
      fiscal_id_type: ["nif", "nie", "passport", "cif"],
      savage_access_level: ["none", "business_hours", "twenty_four_seven"],
      savage_booking_status: [
        "pending_payment",
        "confirmed",
        "checked_in",
        "completed",
        "cancelled",
        "no_show",
      ],
      savage_credit_source: ["monthly_allowance", "purchased", "complimentary"],
      savage_credit_type: ["desk", "meeting_room"],
      savage_lead_status: [
        "new",
        "confirmed",
        "completed",
        "follow_up",
        "converted",
        "lost",
      ],
      savage_member_status: [
        "active",
        "paused",
        "past_due",
        "cancelled",
        "churned",
      ],
      savage_pass_status: [
        "pending_payment",
        "active",
        "used",
        "cancelled",
        "expired",
      ],
      savage_pass_type: ["day", "week"],
      savage_plan_type: [
        "checkpoint",
        "connector",
        "explorer",
        "nomad",
        "all_star",
      ],
      savage_product_category: [
        "subscription",
        "pass",
        "room_booking",
        "hour_bundle",
        "addon",
        "guest_pass",
      ],
      savage_recurrence_pattern: ["daily", "weekly", "biweekly"],
      savage_resource_status: ["available", "occupied", "out_of_service"],
      savage_resource_type: ["desk", "meeting_room", "podcast_room"],
    },
  },
} as const

