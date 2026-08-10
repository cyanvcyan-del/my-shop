import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion defaultValue={["shipping"]} className="max-w-5xl bg-mainT shadow-[3px_4px_6.7px_rgba(0,0,0,0.02)] rounded-3xl p-5 text-lg  text-gray-900 mt-3">
     
      <AccordionItem value="Verdea" id="Verdea">
        <AccordionTrigger className="font-semibold text-lg">What is Verdea?</AccordionTrigger>
        <AccordionContent>
          Verdea is a healthy food brand focused on creating delicious,
                  balanced, and convenient meals for everyday life. Our meals
                  are thoughtfully prepared with quality ingredients and
                  balanced portions.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Healthy">
        <AccordionTrigger className="font-semibold text-lg"> Are Verdea meals suitable for specific health conditions?</AccordionTrigger>
        <AccordionContent>
           Our meals can support different nutritional goals, but they
                  are not intended to diagnose, treat, or cure any medical
                  condition. If you have diabetes, high cholesterol, or another
                  medical condition, please consult a qualified healthcare
                  professional before making significant dietary changes.
        </AccordionContent>
      </AccordionItem>
       <AccordionItem value="TermsConditions" id="TermsConditions">
        <AccordionTrigger className="font-semibold text-lg">Orders and Availability</AccordionTrigger>
        <AccordionContent>
           Orders are subject to product availability. Verdea may
                  update, replace, or remove menu items when necessary to
                  maintain product quality and availability.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="TermsConditions">
        <AccordionTrigger className="font-semibold text-lg">Dietary Requirements</AccordionTrigger>
        <AccordionContent>
           Customers are responsible for checking ingredients and
                  nutritional information when they have allergies,
                  intolerances, or specific dietary requirements. If you have
                  a medical condition or strict dietary restrictions, consult
                  a qualified healthcare professional before ordering.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="ShippingPolicy" id="ShippingPolicy">
        <AccordionTrigger className="font-semibold text-lg">Same-Day Delivery</AccordionTrigger>
        <AccordionContent>
           At Verdea, we aim to make healthy eating as convenient as
                  possible. Orders are delivered on the same day, helping you
                  enjoy your meals fresh and without unnecessary waiting.
        </AccordionContent>
      </AccordionItem>

       <AccordionItem value="ShippingPolicy">
        <AccordionTrigger className="font-semibold text-lg">Free Delivery</AccordionTrigger>
        <AccordionContent>
          Delivery is completely free. There are no additional
                  shipping charges added to your order.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
