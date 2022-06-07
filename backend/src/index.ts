import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({success: true})
})

app.post("/submit", (req, res) => {
    const body = req.body;
    if (typeof body.fullName !== "string")
        return res.json({error: "Ожидался fullName"})
    if (typeof body.passport !== "object")
        return res.json({error: "Ожидался passport"})
    if (typeof body.age !== "number")
        return res.json({error: "Ожидался age"})
    if (typeof body.criminalRecords !== "boolean")
        return res.json({error: "Ожидался criminalRecords"})
    if (typeof body.loanAmount !== "number")
        return res.json({error: "Ожидался loanAmount"})
    if (typeof body.goal !== "string")
        return res.json({error: "Ожидался goal"})
    if (typeof body.employment !== "string")
        return res.json({error: "Ожидался employment"})
    if (typeof body.employment !== "string")
        return res.json({error: "Ожидался employment"})
    if (typeof body.otherLoans !== "string")
        return res.json({error: "Ожидался otherLoans"})
    if (typeof body.loanCollateral !== "string")
        return res.json({error: "Ожидался loanCollateral"})

    if (typeof body.passport.date !== "string")
        return res.json({error: "Ожидался passport.date"});
    if (typeof body.passport.issuedBy !== "string")
        return res.json({error: "Ожидался passport.issuedBy"});
    if (typeof body.passport.number !== "string")
        return res.json({error: "Ожидался passport.number"});
    if (typeof body.passport.registration !== "string")
        return res.json({error: "Ожидался passport.registration"});
    if (typeof body.passport.series !== "string")
        return res.json({error: "Ожидался passport.series"});

    let points = 0;

    if (body.age >= 18 && body.age <= 28) {
        if (body.loanAmount >= 1000000) points += 12;
    } else if (body.age >= 29 && body.age <= 59) {
        points += 14;
    } else if (body.age >= 60 && body.age <= 72) {
        if (body.loanCollateral) points += 8;
    }

    if (!body.criminalRecords) points += 15;

    switch (body.employment) {
        case "договор ТК РФ":
            points += 14;
            break;
        case "ИП":
            points += 12;
            break;
        case "без договора":
            points += 8;
            break;
    }

    if (body.age < 70) points += 5;


    switch (body.goal) {
        case "Потребительский кредит":
            points += 14;
            break;
        case "Недвижимость":
            points += 8;
            break;
        case "Перекредитование":
            points += 12;
            break;
    }

    if (body.loanCollateral.toLowerCase().includes("недвижимость")) {
        points += 14;
    }
    if (body.loanCollateral.toLowerCase().includes("автомобиль")) {
        const carAgeArray = (body.loanCollateral as string).match(/\d/);
        const carAge = Number(carAgeArray?.[0]);
        if (carAge) {
            if (carAge < 3) points += 8;
            if (carAge >= 3) points += 3;
        }
    }
    if (body.loanCollateral.toLowerCase().includes("поручительство")) {
        points += 12;
    }
    if (body.otherLoans) {
        if (body.goal !== "Перекредитование") {
            points += 15;
        }
    }

    if (body.loanAmount <= 1000000) {
        points += 12;
    } else if (body.loanAmount <= 5000000) {
        points += 14;
    }else if (body.loanAmount <= 10000000) {
        points += 8;
    }

    if (points > 80) {
        return res.json({
            accepted: true,
            title: "Заявка одобрена!",
            message: `${body.fullName}, ваша заявка на ${body.loanAmount}₽ была одобрена! Процентная ставка: ${checkForRate(points)}%.`
        })
    } else {
        return res.json({
            accepted: false,
            title: "Заявка отклонена!",
            message: `${body.fullName} к сожалению, ваша заявка на ${body.loanAmount}₽ была отклонена!`
        });
    }
})

app.listen(5000, () => console.log(`Запущен`))

const checkForRate = (points: number) => {
    if (points >= 100) return 12.5;
    if (points >= 96) return 15;
    if (points >= 92) return 19;
    if (points >= 88) return 22;
    if (points >= 84) return 26;
    if (points >= 80) return 30;
    return 35;
}