import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function makeBucketPublic() {
  const { data, error } = await supabase
    .from("storage.buckets")
    .update({ public: true })
    .eq("id", "sell-images");
    
  // Since we cannot query the system schema directly through supabase-js,
  // we can use the storage API to update the bucket!
  const { data: updateData, error: updateError } = await supabase.storage.updateBucket('sell-images', {
    public: true,
  });

  if (updateError) {
    console.error("Failed to update bucket:", updateError);
  } else {
    console.log("Bucket is now public!", updateData);
  }
}

makeBucketPublic();

