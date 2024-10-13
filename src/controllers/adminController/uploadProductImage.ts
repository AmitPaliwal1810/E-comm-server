import { NextFunction, Response, Request } from "express";
import { ImageUploadRequest } from "../../commonInterfaces";
import { UploadImage } from "../../Utlis";
import fs from "fs";
import { pool } from "../../database/config/connection";

export const UploadProductImage = async (
  req: ImageUploadRequest,
  res: Response,
  next: NextFunction
) => {
  const { file } = req;

  if (!file) {
    return res.status(500).json({
      message: "image-invalid",
    });
  }

  const productImageUploadQuery = `INSERT INTO productimages (url, name, size) VALUES ($1, $2, $3) RETURNING id`;

  try {
    const response = await UploadImage(file.path);

    if (!response) {
      res.status(500).json({
        message: "not uploadding",
      });
    }

    const { rows } = await pool.query(productImageUploadQuery, [
      response?.url,
      response?.original_filename,
      response?.bytes,
    ]);

    if (!rows || rows.length === 0) {
      throw new Error("Database insertion failed");
    }

    res.status(200).json({
      message: "uploaded successfully",
      id: rows[0]?.id,
    });

    // Wrap the fs.unlinkSync call in a try-catch to handle potential errors
    try {
      fs.unlinkSync(file.path);
    } catch (unlinkError) {
      console.error("Error deleting file:", unlinkError);
    }
  } catch (error) {
    // Attempt to delete the file if an error occurs
    try {
      fs.unlinkSync(file.path);
    } catch (unlinkError) {
      console.error("Error deleting file:", unlinkError);
    }
    next(error);
  }
};
