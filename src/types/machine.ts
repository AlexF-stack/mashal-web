export interface Machine {
  id: string;
  category: string;
  designation: {
    fr: string;
    en: string;
  };
  description?: {
    fr: string;
    en: string;
  } | null;
  image_id?: string | null;
  specs_raw?: string | null;
  extra_info?: string | null;
  engine_brand_model?: string | null;
  rated_power_kw?: number | string | null;
  gross_power_kw?: number | string | null;
  net_power_kw?: number | string | null;
  rated_power_hp?: number | null;
  net_power_hp?: number | null;
  weight_min?: number | null;
  weight_max?: number | null;
  bucket_val?: number | null;
  depth_val?: number | string | null;
  blade_width_mm?: number | null;
  max_speed_kmh?: number | null;
  draw_bar_pull_kN?: number | null;
  breakout_force_kN?: number | null;
  dump_clearance_mm?: number | null;
  amplitude_range?: string | null;
  vibration_frequency_hz?: number | null;
  centrifugal_force_kN?: number | null;
  working_width_mm?: number | null;
  operating_mass_kg?: number | null;
  displacement_l?: number | null;
  cylinders?: number | null;
  rated_speed_rpm?: number | null;
  max_torque_nm?: number | null;
  fuel_type?: string | null;
}
