export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      chat_messages: {
        Row: {
          created_at: string
          id: string
          is_assistant: boolean | null
          message: string
          speech_audio_url: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_assistant?: boolean | null
          message: string
          speech_audio_url?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_assistant?: boolean | null
          message?: string
          speech_audio_url?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      course_enrollments: {
        Row: {
          course_id: string
          created_at: string
          id: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      course_reviews: {
        Row: {
          comment: string
          course_id: string
          created_at: string
          id: string
          rating: number
          reviewer_name: string
          user_id: string
        }
        Insert: {
          comment: string
          course_id: string
          created_at?: string
          id?: string
          rating: number
          reviewer_name: string
          user_id: string
        }
        Update: {
          comment?: string
          course_id?: string
          created_at?: string
          id?: string
          rating?: number
          reviewer_name?: string
          user_id?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          articles: number | null
          created_at: string | null
          description: string | null
          id: string
          instructor: Json | null
          level: string | null
          original_price: number | null
          outcomes: string[] | null
          price: number | null
          rating: number | null
          rating_count: number | null
          resources: number | null
          students: number | null
          thumbnail: string | null
          title: string
          updated_at: string | null
          video_hours: number | null
        }
        Insert: {
          articles?: number | null
          created_at?: string | null
          description?: string | null
          id: string
          instructor?: Json | null
          level?: string | null
          original_price?: number | null
          outcomes?: string[] | null
          price?: number | null
          rating?: number | null
          rating_count?: number | null
          resources?: number | null
          students?: number | null
          thumbnail?: string | null
          title: string
          updated_at?: string | null
          video_hours?: number | null
        }
        Update: {
          articles?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          instructor?: Json | null
          level?: string | null
          original_price?: number | null
          outcomes?: string[] | null
          price?: number | null
          rating?: number | null
          rating_count?: number | null
          resources?: number | null
          students?: number | null
          thumbnail?: string | null
          title?: string
          updated_at?: string | null
          video_hours?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          preferences: Json | null
          strengths: string[] | null
          updated_at: string
          weaknesses: string[] | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          preferences?: Json | null
          strengths?: string[] | null
          updated_at?: string
          weaknesses?: string[] | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          preferences?: Json | null
          strengths?: string[] | null
          updated_at?: string
          weaknesses?: string[] | null
        }
        Relationships: []
      }
      srd: {
        Row: {
          content: string
          id: number
        }
        Insert: {
          content: string
          id?: number
        }
        Update: {
          content?: string
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
  public: {
    Enums: {},
  },
} as const
