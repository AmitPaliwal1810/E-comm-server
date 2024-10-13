import { NextFunction, Response } from "express";
import { ExtenedRequest } from "../../commonInterfaces";
import { pool } from "../../database/config/connection";

//* ================================== Admin Unauthorized Check =======================================

const AdminUnauthorizedCheck = (user_role: string, res: Response) => {
  if (user_role !== "admin") {
    res.status(401).json({
      message: "unauthorized",
    });
  }
};

//* ============================Add Product ========================================

export const AddProduct = async (
  req: ExtenedRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, desc, price, stockcount, images } = req.body;
  const { user_role } = req;
  const productInsertQuery = `INSERT INTO products (name,"desc",price,stock_count, images) VALUES ($1,$2,$3,$4,$5) RETURNING id `;

  try {
    AdminUnauthorizedCheck(user_role, res);
    const { rows } = await pool.query(productInsertQuery, [
      name,
      desc,
      price,
      stockcount,
      images,
    ]);
    if (rows.length === 0) {
      res.status(500).json({
        message: "unable to register product",
      });
    }
    res.status(201).json({
      message: "product registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

//* ============================ Update Product Details ==============================

export const UpdateProduct = async (
  req: ExtenedRequest,
  res: Response,
  next: NextFunction
) => {
  const { id, name, desc, price, stockcount, images } = req.body;
  const { user_role } = req;
  const productUpdateQuery = `UPDATE products SET name=$1 , "desc"=$2 , price=$3 , stock_count=$4, images=$5 WHERE id=$6`;
  try {
    AdminUnauthorizedCheck(user_role, res);
    const { rows } = await pool.query(productUpdateQuery, [
      name,
      desc,
      price,
      stockcount,
      images,
      id,
    ]);
    res.status(201).json({
      message: "Product Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};
