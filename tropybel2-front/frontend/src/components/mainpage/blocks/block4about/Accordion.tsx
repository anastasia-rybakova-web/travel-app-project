import React, { useState } from "react";

interface AccordionItem {
  title: string;
  text: string;
}

const items: AccordionItem[] = [
  {
    title: "Очень быстрая поддержка",
    text: "Наша команда реагирует на ваши запросы максимально оперативно."
  },
  {
    title: "Опытные специалисты",
    text: "Мы собрали команду гидов и консультантов, которые знают все нюансы."
  },
  {
    title: "Награды и доверие",
    text: "Наш сервис отмечен премиями и пользуется доверием путешественников."
  }
];

export default function Accordion(): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <div key={index} className={`accordion-item ${isActive ? "active" : ""}`}>
            <div
              className="accordion-title"
              onClick={() => setActiveIndex(isActive ? null : index)}
            >
              {item.title}
            </div>
            {isActive && (
              <div className="accordion-content">
                <p>{item.text}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}