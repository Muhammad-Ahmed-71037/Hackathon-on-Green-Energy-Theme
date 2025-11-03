/*
  # Create results and leaderboard tables for EcoSync

  1. New Tables
    - `results`
      - `id` (uuid, primary key) - Unique identifier for each result
      - `created_by` (uuid, nullable) - User ID who created the result (null for anonymous)
      - `name` (text) - Name of the user
      - `city` (text) - Selected city
      - `monthly_units` (integer) - Monthly electricity consumption in kWh
      - `heavy_hours` (integer) - Heavy appliance usage hours per day
      - `daytime_usage_pct` (integer) - Percentage of daytime usage
      - `budget` (integer) - Budget in PKR
      - `net_metering` (boolean) - Whether net metering is enabled
      - `outputs` (jsonb) - Calculation outputs including system size, savings, etc.
      - `created_at` (timestamptz) - Timestamp of creation

    - `leaderboard`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (uuid) - User ID (required for leaderboard)
      - `name` (text) - Display name
      - `city` (text) - City name
      - `score` (integer) - Eco efficiency score (0-100)
      - `result_id` (uuid) - Reference to the result
      - `created_at` (timestamptz) - Timestamp of creation

  2. Security
    - Enable RLS on both tables
    - `results` table:
      - Anyone can read all results
      - Authenticated users can insert their own results
      - Users can update only their own results
      - Users can delete only their own results
    - `leaderboard` table:
      - Anyone can read all leaderboard entries
      - Authenticated users can insert their own entries
      - Users can delete only their own entries

  3. Indexes
    - Index on `results.created_by` for faster user queries
    - Index on `leaderboard.city` and `leaderboard.score` for leaderboard queries
*/

CREATE TABLE IF NOT EXISTS results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by uuid,
  name text NOT NULL DEFAULT 'Anonymous',
  city text NOT NULL,
  monthly_units integer NOT NULL,
  heavy_hours integer NOT NULL,
  daytime_usage_pct integer NOT NULL,
  budget integer DEFAULT 0,
  net_metering boolean DEFAULT false,
  outputs jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  city text NOT NULL,
  score integer NOT NULL CHECK (score >= 0 AND score <= 100),
  result_id uuid,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read results"
  ON results
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert results"
  ON results
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own results"
  ON results
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete own results"
  ON results
  FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

CREATE POLICY "Anyone can read leaderboard"
  ON leaderboard
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert leaderboard"
  ON leaderboard
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own leaderboard entries"
  ON leaderboard
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_results_created_by ON results(created_by);
CREATE INDEX IF NOT EXISTS idx_leaderboard_city_score ON leaderboard(city, score DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard(score DESC);
