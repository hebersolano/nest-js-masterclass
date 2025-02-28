import { registerAs } from "@nestjs/config";

export default registerAs("appConfig", () => {
  return {
    environment: process.env.NODE_ENV || "production",
    apiVersion: process.env.API_VERSION,
    awsRegion: process.env.AWS_REGION,
    awsBucketName: process.env.AWS_BUCKET_NAME,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsAccessKeySecret: process.env.AWS_ACCESS_KEY_SECRET,
    awsCloudfrontUrl: process.env.AWS_CLOUDFRONT_URL,
  };
});
