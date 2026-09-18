import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const env = fs.readFileSync(".env.local", "utf8");
const supabaseUrl = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1];
const supabaseKey = env.match(/SUPABASE_SECRET_KEY=(.*)/)[1];

const supabase = createClient(supabaseUrl, supabaseKey);

async function makeBucketPublic() {
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

