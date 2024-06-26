import { NextFunction, Request, Response } from "express";
import { listingRepo } from "../repositories";
import { z } from "zod";
import { isEmpty } from "lodash";
import { asynTasks } from "../../../tasks";

export const getListings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await listingRepo.findByCriteria(req.query);
    if (!isEmpty(req.query)) {
      await asynTasks.addUserSearch({
        resourcepathName: "/listings",
        params: Object.entries(req.query as Record<string, string>).map(
          ([name, value]) => ({
            name,
            value,
          })
        ),
        person: (req as any).user?.person?.id,
      });
    }
    return res.json(results);
  } catch (error) {
    return next(error);
  }
};

export const getListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "Listing not found" } };
    }
    const listing = await listingRepo.findOneById(idValidation.data);
    return res.json(listing);
  } catch (error) {
    return next(error);
  }
};

export const addListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await listingRepo.create(req.body));
  } catch (error) {
    return next(error);
  }
};

export const updateListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "Listing not found" } };
    }
    return res.json(await listingRepo.updateById(idValidation.data, req.body));
  } catch (error) {
    return next(error);
  }
};
export const deleteListing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idValidation = z.string().uuid().safeParse(req.params.id);
    if (!idValidation.success) {
      throw { status: 404, errors: { detail: "Listing not found" } };
    }
    return res.json(await listingRepo.deleteById(idValidation.data));
  } catch (error) {
    return next(error);
  }
};
