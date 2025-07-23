import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

type AccordionItemType ={
    value:string;
    question:string;
    answer:string;
};

interface AccordionListProps{
    items: AccordionItemType[];
}

export default function AccordionList({items}: AccordionListProps){
    return(
        <Accordion type="single" collapsible>
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
}
