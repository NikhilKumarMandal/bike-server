import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import { ApiError } from "./api-error";

cloudinary.config({
    cloud_name: 'dfnbvscob',
    api_key: '332287963247526',
    api_secret: 'bz4ES2JEgFlAPcmqPMg_03kbVlQ'
});

const uploadFile = async (filePath: string) => {
  try {
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      background_removal: "cloudinary_ai",
    });
    fs.unlinkSync(filePath);

    return response;
  } catch (error: any) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw new ApiError(500, "Failed to upload file to cloudinary");
  }
};

const deleteFile = async (fileId: string, resource_type: string) => {
  try {
    const publicId = fileId;
    if (!publicId.trim() || !resource_type.trim()) {
      throw new ApiError(400, "Invalid or Empty FileId or ResourceType");
    }
    if (publicId && resource_type) {
      const resposne = await cloudinary.uploader.destroy(publicId, {
        resource_type,
      });
      return resposne;
    } else return false;
  } catch (error) {
    throw new ApiError(500, "Failed to delete file from cloudinary");
  }
};

export { uploadFile, deleteFile };





// import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
// import fs from "fs";

// cloudinary.config({
//   cloud_name: 'dfnbvscob',
//   api_key: '332287963247526',
//   api_secret: 'bz4ES2JEgFlAPcmqPMg_03kbVlQ'
// });


// const uploadOnCloudinary = async (localFilePath: string): Promise<UploadApiResponse | null> => {
//   try {
//     if (!localFilePath) return null;
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto"
//     });

//     fs.unlinkSync(localFilePath);
//     return response;

//   } catch (error) {
//     fs.unlinkSync(localFilePath);
//     if (error instanceof Error) {
//       console.error(error.message)
//     }
//     return null;
//   }
// };

// const deleteFromCloudinary = async (public_id: string, resource_type: "image"): Promise<UploadApiResponse | null> => {
//   try {
//     if (!public_id) {
//       return null;
//     }

//     // Delete from Cloudinary
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//     const response = await cloudinary.uploader.destroy(public_id, {
//       invalidate: true,
//       resource_type
//     });



//     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//     return response;
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error(error.message)
//     }
//     return null;
//   }
// };

// export {
//   uploadOnCloudinary,
//   deleteFromCloudinary
// };

