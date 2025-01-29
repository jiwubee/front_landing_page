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
          "Dziękujemy za rezerwację! Potwierdzenie zostanie wysłane na podany adres email.",
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

const Reservation: React.FC = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 12; hour <= 21; hour++) {
      for (let minute of ["00", "30"]) {
        slots.push(`${hour}:${minute}`);
      }
    }
    return slots;
  };

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
          "Wystąpił błąd podczas składania rezerwacji. Spróbuj ponownie.",
      });
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  return (
    <section id="reservations" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Rezerwacja stolika
            </h2>
            <p className="text-gray-400 mb-8">
              Zaplanuj wizytę w naszej restauracji. Rezerwacji można dokonać z
              maksymalnie 30-dniowym wyprzedzeniem.
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
              phone: "",
              email: "",
              date: tomorrow.toISOString().split("T")[0],
              time: "18:00",
              guests: "2",
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .required("Imię jest wymagane")
                .min(2, "Imię musi mieć co najmniej 2 znaki"),
              phone: Yup.string()
                .required("Numer telefonu jest wymagany")
                .matches(
                  /^[0-9]{9}$/,
                  "Numer telefonu powinien zawierać 9 cyfr"
                ),
              email: Yup.string()
                .email("Nieprawidłowy adres email")
                .required("Email jest wymagany"),
              date: Yup.date()
                .required("Data jest wymagana")
                .min(
                  tomorrow,
                  "Rezerwacje przyjmujemy z minimum jednodniowym wyprzedzeniem"
                )
                .max(
                  maxDate,
                  "Rezerwacje przyjmujemy maksymalnie z 30-dniowym wyprzedzeniem"
                ),
              time: Yup.string().required("Godzina jest wymagana"),
              guests: Yup.number()
                .required("Liczba gości jest wymagana")
                .min(1, "Minimum 1 osoba")
                .max(
                  8,
                  "Dla grup powyżej 8 osób prosimy o kontakt telefoniczny"
                ),
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
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-300 mb-1">
                      Telefon *
                    </label>
                    <Field
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white 
                               focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="mt-1 text-sm text-red-400"
                    />
                  </div>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-300 mb-1">
                      Data *
                    </label>
                    <Field
                      type="date"
                      id="date"
                      name="date"
                      min={tomorrow.toISOString().split("T")[0]}
                      max={maxDate.toISOString().split("T")[0]}
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white 
                               focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="mt-1 text-sm text-red-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-gray-300 mb-1">
                      Godzina *
                    </label>
                    <Field
                      as="select"
                      id="time"
                      name="time"
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white 
                               focus:ring-2 focus:ring-red-500 focus:border-transparent">
                      {generateTimeSlots().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="time"
                      component="div"
                      className="mt-1 text-sm text-red-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-sm font-medium text-gray-300 mb-1">
                      Liczba osób *
                    </label>
                    <Field
                      as="select"
                      id="guests"
                      name="guests"
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white 
                               focus:ring-2 focus:ring-red-500 focus:border-transparent">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="guests"
                      component="div"
                      className="mt-1 text-sm text-red-400"
                    />
                  </div>
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
                      : "Zarezerwuj stolik"}
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

export default Reservation;
