const { z } = require("zod");

// Reusable Middleware to validate requests against a Zod schema
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({ message: "Validation failed", errors: formattedErrors });
    }
    next(error);
  }
};

// --- Schemas ---

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(50),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  regiNo: z.string().min(2, "Registration number is required"),
  role: z.string().optional(),
});

const loginSchema = z.object({
  mail: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

const createComplaintSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  subject: z.string().min(2, "Subject is required"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000),
  // Image is handled by multer, so we don't strictly validate it in req.body here
});

const updateComplaintSchema = z.object({
  status: z.enum(["Pending", "In Progress", "Resolved", "Rejected"]).optional(),
  response: z.string().max(1000).optional(),
});

const createAdminSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  regiNo: z.string().min(2),
  department: z.string().optional(),
});

module.exports = {
  validate,
  signupSchema,
  loginSchema,
  createComplaintSchema,
  updateComplaintSchema,
  createAdminSchema,
};
