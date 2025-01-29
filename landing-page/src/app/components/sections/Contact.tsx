"use client";
import React, { useReducer, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormState {
  status: FormStatus;
  errorMessage: string | null;
  successMessage: string | null;
}

type FormAction =
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; payload: string }
  | { type: "RESET_FORM" };

const initialState: FormState = {
  status: "idle",
  errorMessage: null,
  successMessage: null,
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SUBMIT_START":
      return {
        ...state,
        status: "submitting",
        errorMessage: null,
        successMessage: null,
      };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        status: "success",
        successMessage:
          "Dziękujemy za wiadomość! Odpowiemy najszybciej jak to możliwe.",
      };
    case "SUBMIT_ERROR":
      return {
        ...state,
        status: "error",
        errorMessage: action.payload,
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

const Contact: React.FC = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    dispatch({ type: "SUBMIT_START" });
    try {
      // Symulacja wysyłania - tutaj byłoby API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch({ type: "SUBMIT_SUCCESS" });
      resetForm();
      setTimeout(() => {
        dispatch({ type: "RESET_FORM" });
      }, 3000);
    } catch (error) {
      dispatch({
        type: "SUBMIT_ERROR",
        payload:
          "Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.",
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Kontakt
            </h2>
            <p className="text-gray-400 mb-8">
              Masz pytania lub uwagi? Jesteśmy tu, aby pomóc. Skontaktuj się z
              nami!
            </p>

            {formState.successMessage && (
              <div className="mb-4 p-4 bg-green-900/50 text-green-400 rounded-lg border border-green-800">
                {formState.successMessage}
              </div>
            )}
            {formState.errorMessage && (
              <div className="mb-4 p-4 bg-red-900/50 text-red-400 rounded-lg border border-red-800">
                {formState.errorMessage}
              </div>
            )}
          </div>

          <Formik
            initialValues={{
              name: "",
              email: "",
              type: "general",
              message: "",
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .required("Imię jest wymagane")
                .min(2, "Imię musi mieć co najmniej 2 znaki"),
              email: Yup.string()
                .email("Nieprawidłowy adres email")
                .required("Email jest wymagany"),
              type: Yup.string().required("Wybierz rodzaj zapytania"),
              message: Yup.string()
                .required("Wiadomość jest wymagana")
                .min(10, "Wiadomość musi mieć co najmniej 10 znaków"),
            })}
            onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form ref={formRef} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-1">
                      Imię i nazwisko *
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white 
                               focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="mt-1 text-sm text-red-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-1">
                      Email *
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white 
                               focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-1 text-sm text-red-400"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-300 mb-1">
                    Rodzaj zapytania *
                  </label>
                  <Field
                    as="select"
                    id="type"
                    name="type"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white 
                             focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="general">Zapytanie ogólne</option>
                    <option value="catering">
                      Zamówienie grupowe/Catering
                    </option>
                    <option value="collaboration">Współpraca</option>
                    <option value="complaint">Reklamacja/Uwagi</option>
                  </Field>
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="mt-1 text-sm text-red-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1">
                    Wiadomość *
                  </label>
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white 
                             focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="mt-1 text-sm text-red-400"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting || formState.status === "submitting"}
                    className={`px-8 py-3 bg-red-600 text-white rounded-lg transition-all
                      ${
                        isSubmitting || formState.status === "submitting"
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-red-700"
                      }`}>
                    {formState.status === "submitting"
                      ? "Wysyłanie..."
                      : "Wyślij wiadomość"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Contact;
