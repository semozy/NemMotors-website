import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const env = fs.readFileSync(".env.local", "utf8");
const supabaseUrl = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1];
const supabaseKey = env.match(/SUPABASE_SECRET_KEY=(.*)/)[1];

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateTransmissions() {
  const { data, error } = await supabase
    .from("vehicles")
    .update({ transmission: "Manueel" })
    .eq("transmission", "Handgeschakeld");

  if (error) {
    console.error("Failed to update vehicles:", error);
  } else {
    console.log("Updated vehicles to Manueel!");
  }
}

updateTransmissions();

