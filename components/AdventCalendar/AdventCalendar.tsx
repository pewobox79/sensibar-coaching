import "@/styles/AdventCalendar.css";
import Container from "@/components/global/Container";
import {AdventCard} from "@/components/AdventCalendar/AdventCard";

const days = [
    {day: 1, variant: "accent"},
    {day: 9},
    {day: 3},
    {day: 17},
    {day: 13},
    {day: 6, variant: "accent"},

    {day: 7},
    {day: 20},
    {day: 4, variant: "accent"},
    {day: 10},
    {day: 2, variant: "accent"},
    {day: 12},

    {day: 22, variant: "accent"},
    {day: 14},
    {day: 24},
    {day: 16},
    {day: 18},
    {day: 23},

    {day: 19},
    {day: 8},
    {day: 21, variant: "accent"},
    {day: 11},
    {day: 15, variant: "accent"},
    {day: 5},
];



export default function AdventCalendar() {

    return (
        <Container id="calendarPage">
            <div className="adventCalendar">
                { days.map((item, index) => (
                    <AdventCard
                        key={ item.day }
                        day={ item.day }
                        variant={ item.variant }
                        index={ index }
                    />
                )) }
            </div>
        </Container>
    );
}