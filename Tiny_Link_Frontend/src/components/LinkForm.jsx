import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createLink } from "../service/API_Service";
import toast from "react-hot-toast";

export default function LinkForm({ refresh, onClose }) {
  const initialValues = {
    original_url: "",
    code: "",
  };

  const validationSchema = Yup.object({
    original_url: Yup.string()
      .url("Enter a valid URL")
      .required("Long URL is required"),
    code: Yup.string().max(20, "Code must be under 20 characters"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await createLink(values);

      toast.success("Short link created successfully!");

      resetForm();
      refresh();
      onClose(); // close modal after success
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create link");
    }

    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
      {/* Modal Box */}
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-full shadow transition"
        >
          ✕
        </button>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5 transition-all">
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
                Create Short Link
              </h2>

              <p className="text-center text-gray-500 text-sm mb-4">
                Paste a long URL and generate a clean, trackable short link.
              </p>

              {/* Long URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Long URL
                </label>

                <Field
                  name="original_url"
                  type="text"
                  placeholder="https://example.com/some/very/long/url"
                  className="w-full border border-gray-300 p-3 rounded-xl shadow-sm 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                  transition-all text-gray-700"
                />

                <ErrorMessage
                  name="original_url"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Custom Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Code (optional)
                </label>

                <Field
                  name="code"
                  type="text"
                  placeholder="my-custom-code"
                  className="w-full border border-gray-300 p-3 rounded-xl shadow-sm 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                  transition-all text-gray-700"
                />

                <ErrorMessage
                  name="code"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white 
                font-semibold py-3 rounded-xl shadow-md transition-all 
                disabled:bg-blue-300"
              >
                {isSubmitting ? "Creating..." : "Generate Short Link"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
