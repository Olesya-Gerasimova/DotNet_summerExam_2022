import React, {useState} from 'react';
import './App.scss';
import {useFormik} from "formik";
import * as yup from "yup";

export const App = () => {
    const [response, setResponse] = useState<Response>();
    const formik = useFormik({
        initialValues: {
            fullName: "", // ФИО
            passport: {
                series: "", // серия
                number: "", // номер
                issuedBy: "", // кем выдан
                date: "", // дата выдачи
                registration: "" // информация о прописке
            },
            age: "", // Возраст
            criminalRecords: false, // Сведения о судимости: была/не было
            loanAmount: 1000000, // Сумма кредита
            goal: "Потребительский кредит", // Цель
            employment: "договор ТК РФ", // Трудоустройство
            otherLoans: "", // Другие кредиты
            loanCollateral: "" // Информация о залоге
        },
        validationSchema: yup.object({
            fullName: yup.string()
                .required("Введите ФИО"),
            passport: yup.object().shape({
                series: yup.string().required("Требуется серия"),
                number: yup.string().required("Требуется номер"),
                issuedBy: yup.string().required("Не указано кем выдан"),
                date: yup.string().required("Требуется дата"),
                registration: yup.string().required("Требуется прописка")
            }),
            age: yup.number()
                .typeError("Возраст должен быть числом")
                .required("Необходимо число")
                .min(18, "Минимальный возраст - 18 лет"),
            criminalRecords: yup.boolean().required(),
            loanAmount: yup.number(),
            goal: yup.string().required("Требуется цель"),
            employment: yup.string().required(),
            otherLoans: yup.string(),
            loanCollateral: yup.string().required("Требуется указать информацию о других залогах")
        }),
        onSubmit: async (data) => {
            console.log(data);
            fetch("http://localhost:5000/submit", {
                method: "POST",
                body: JSON.stringify({...data, age: Number(data.age)}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(r => r.json())
                .then(res => {
                    console.log(res);
                    setResponse(res);
                })
        }
    });
  return (
      <div className="wrapper">
        <h2>DotNet Project</h2>
          <form onSubmit={formik.handleSubmit}>
              <label htmlFor="fullName">
                  ФИО
              </label>
              <input
                  type="text"
                  placeholder="Иван Иванов Иванович"
                  name="fullName"
                  id="fullName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullName}
              />
              {formik.touched.fullName && formik.errors.fullName ? (
                  <span>{formik.errors.fullName}</span>
              ) : null}
              <div className="passport">
                  <div className="small">
                      <label htmlFor="passport.series">
                          Серия
                      </label>
                      <input
                          type="text"
                          placeholder="0000"
                          name="passport.series"
                          id="passport.series"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.passport.series}
                      />
                      {formik.touched.passport?.series && formik.errors.passport?.series ? (
                          <span>{formik.errors.passport.series}</span>
                      ) : null}
                  </div>
                  <div className="medium">
                      <label htmlFor="passport.number">
                          Номер
                      </label>
                      <input
                          type="text"
                          placeholder="000000"
                          name="passport.number"
                          id="passport.number"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.passport.number}
                      />
                      {formik.touched.passport?.number && formik.errors.passport?.number ? (
                          <span>{formik.errors.passport.number}</span>
                      ) : null}
                  </div>
                  <div className="full">
                      <label htmlFor="passport.issuedBy">
                          Кем выдан
                      </label>
                      <input
                          type="text"
                          placeholder=""
                          name="passport.issuedBy"
                          id="passport.issuedBy"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.passport.issuedBy}
                      />
                      {formik.touched.passport?.issuedBy && formik.errors.passport?.issuedBy ? (
                          <span>{formik.errors.passport.issuedBy}</span>
                      ) : null}
                  </div>
                  <div className="full">
                      <label htmlFor="passport.date">
                          Дата выдачи
                      </label>
                      <input
                          type="date"
                          placeholder="XX.XX.XX"
                          name="passport.date"
                          id="passport.date"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.passport.date}
                      />
                      {formik.touched.passport?.date && formik.errors.passport?.date ? (
                          <span>{formik.errors.passport.date}</span>
                      ) : null}
                  </div>
                  <div className="full">
                      <label htmlFor="passport.registration">
                          Информация о прописке
                      </label>
                      <input
                          type="text"
                          placeholder=""
                          name="passport.registration"
                          id="passport.registration"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.passport.registration}
                      />
                      {formik.touched.passport?.registration && formik.errors.passport?.registration ? (
                          <span>{formik.errors.passport.registration}</span>
                      ) : null}
                  </div>
              </div>
              <label htmlFor="age">
                  Возраст
              </label>
              <input
                  type="text"
                  placeholder="18"
                  name="age"
                  id="age"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.age}
              />
              {formik.touched.age && formik.errors.age ? (
                  <span>{formik.errors.age}</span>
              ) : null}
              <div>
                  <input
                      type="checkbox"
                      name="criminalRecords"
                      id="criminalRecords"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.criminalRecords}
                  />
                  <label htmlFor="criminalRecords">
                      Есть сведения о судимости
                  </label>
              </div>
              <label htmlFor="loanAmount">
                  Сумма кредита
              </label>
              <input
                  type="range"
                  name="loanAmount"
                  id="loanAmount"
                  min="100000"
                  max="10000000"
                  step="100000"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.loanAmount}
              />
              <label>
                  {(formik.values.loanAmount / 1000)} тыс. ₽
              </label>
              <label htmlFor="goal">
                  Цель
              </label>
              <select
                  name="goal"
                  id="goal"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.goal}
              >
                  <option>Потребительский кредит</option>
                  <option>Недвижимость</option>
                  <option>Перекредитование</option>
              </select>
              {formik.touched.goal && formik.errors.goal ? (
                  <span>{formik.errors.goal}</span>
              ) : null}
              <label htmlFor="employment">
                  Трудоустройство
              </label>
              <select
                  name="employment"
                  id="employment"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.employment}
              >
                  <option>безработный</option>
                  <option>ИП</option>
                  <option>договор ТК РФ</option>
                  <option>без договора</option>
              </select>
              <label htmlFor="otherLoans">
                  Другие кредиты (необязательно)
              </label>
              <input
                  type="text"
                  placeholder=""
                  name="otherLoans"
                  id="otherLoans"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.otherLoans}
              />
              {formik.touched.otherLoans && formik.errors.otherLoans ? (
                  <span>{formik.errors.otherLoans}</span>
              ) : null}
              <label htmlFor="loanCollateral">
                  Информация о залоге
              </label>
              <input
                  type="text"
                  placeholder=""
                  name="loanCollateral"
                  id="loanCollateral"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.loanCollateral}
              />
              {formik.touched.loanCollateral && formik.errors.loanCollateral ? (
                  <span>{formik.errors.loanCollateral}</span>
              ) : null}
              <button type="submit">Отправить</button>
              {response?.error ? (
                  <span>{response.error}</span>
              ) : null}
          </form>
          {response?.accepted !== undefined ? (
              <div className="result">
                  <b
                      className={response.accepted ? "accepted" : "denied"}
                  >
                      {response.title}
                  </b>
                  <p>{response.message}</p>
              </div>
          ) : null}
      </div>
  )
}

interface ErrorResponse {
    error: string
}

interface SuccessResponse {
    accepted: boolean,
    title: string,
    message: string
}

type Response = ErrorResponse & SuccessResponse;
