import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { trackEvent } from "@/lib/analytics";

// Contact Form Schema
const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  propertyInterest: z.string().optional(),
  message: z.string().optional(),
});

// Consultation Form Schema
const consultationSchema = z.object({
  firstName: z.string().min(1, "Name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  message: z.string().optional(),
});

// Home Valuation Schema
const valuationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  propertyInterest: z.string().min(1, "Property address is required"),
  message: z.string().optional(),
});

// Property Inquiry Schema
const propertyInquirySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;
type ConsultationFormData = z.infer<typeof consultationSchema>;
type ValuationFormData = z.infer<typeof valuationSchema>;
type PropertyInquiryFormData = z.infer<typeof propertyInquirySchema>;

// Contact Form Component
export function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      propertyInterest: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      form.reset();
      trackEvent('contact_form_submission', 'lead_generation', 'contact_form');
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            {...form.register("firstName")}
            className="focus-ring"
          />
          {form.formState.errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            {...form.register("lastName")}
            className="focus-ring"
          />
          {form.formState.errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.lastName.message}
            </p>
          )}
        </div>
      </div>
      
      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          {...form.register("email")}
          className="focus-ring"
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>
      
      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          {...form.register("phone")}
          className="focus-ring"
        />
        {form.formState.errors.phone && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.phone.message}
          </p>
        )}
      </div>
      
      <div>
        <Label htmlFor="propertyInterest">I'm interested in...</Label>
        <Select onValueChange={(value) => form.setValue("propertyInterest", value)}>
          <SelectTrigger className="focus-ring">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="buying">Buying a home</SelectItem>
            <SelectItem value="selling">Selling a home</SelectItem>
            <SelectItem value="valuation">Property valuation</SelectItem>
            <SelectItem value="investment">Investment properties</SelectItem>
            <SelectItem value="consultation">Market consultation</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          {...form.register("message")}
          placeholder="Tell us about your real estate needs..."
          rows={4}
          className="focus-ring"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-soft-blue text-white hover:bg-ocean-blue"
        disabled={contactMutation.isPending}
      >
        {contactMutation.isPending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

// Consultation Form Component
export function Consultation() {
  const { toast } = useToast();
  
  const form = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const consultationMutation = useMutation({
    mutationFn: async (data: ConsultationFormData) => {
      return apiRequest("POST", "/api/consultation", data);
    },
    onSuccess: () => {
      form.reset();
      trackEvent('consultation_form_submission', 'lead_generation', 'consultation_request');
      toast({
        title: "Consultation Scheduled!",
        description: "We'll contact you soon to confirm your appointment.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to schedule consultation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ConsultationFormData) => {
    consultationMutation.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            {...form.register("firstName")}
            className="focus-ring"
          />
          {form.formState.errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            {...form.register("lastName")}
            className="focus-ring"
          />
          {form.formState.errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.lastName.message}
            </p>
          )}
        </div>
      </div>
      
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          {...form.register("email")}
          className="focus-ring"
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>
      
      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          {...form.register("phone")}
          className="focus-ring"
        />
        {form.formState.errors.phone && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.phone.message}
          </p>
        )}
      </div>
      
      <div>
        <Label htmlFor="message">Additional Information</Label>
        <Textarea
          id="message"
          {...form.register("message")}
          placeholder="Tell us about your goals and timeline..."
          rows={3}
          className="focus-ring"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-soft-blue text-white hover:bg-ocean-blue"
        disabled={consultationMutation.isPending}
      >
        {consultationMutation.isPending ? "Scheduling..." : "Schedule Consultation"}
      </Button>
    </form>
  );
}

// Home Valuation Form Component
export function HomeValuation() {
  const { toast } = useToast();
  
  const form = useForm<ValuationFormData>({
    resolver: zodResolver(valuationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      propertyInterest: "",
      message: "",
    },
  });

  const valuationMutation = useMutation({
    mutationFn: async (data: ValuationFormData) => {
      return apiRequest("POST", "/api/valuation", data);
    },
    onSuccess: () => {
      form.reset();
      trackEvent('valuation_form_submission', 'lead_generation', 'home_valuation');
      toast({
        title: "Valuation Request Submitted!",
        description: "We'll prepare your property analysis and contact you within 24 hours.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit valuation request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ValuationFormData) => {
    valuationMutation.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            {...form.register("firstName")}
            className="focus-ring"
          />
          {form.formState.errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            {...form.register("lastName")}
            className="focus-ring"
          />
          {form.formState.errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.lastName.message}
            </p>
          )}
        </div>
      </div>
      
      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          {...form.register("email")}
          className="focus-ring"
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>
      
      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          {...form.register("phone")}
          className="focus-ring"
        />
        {form.formState.errors.phone && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.phone.message}
          </p>
        )}
      </div>
      
      <div>
        <Label htmlFor="propertyInterest">Property Address *</Label>
        <Input
          id="propertyInterest"
          {...form.register("propertyInterest")}
          placeholder="Enter your property address"
          className="focus-ring"
        />
        {form.formState.errors.propertyInterest && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.propertyInterest.message}
          </p>
        )}
      </div>
      
      <div>
        <Label htmlFor="message">Additional Details</Label>
        <Textarea
          id="message"
          {...form.register("message")}
          placeholder="Any additional information about your property..."
          rows={3}
          className="focus-ring"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-soft-blue text-white hover:bg-ocean-blue"
        disabled={valuationMutation.isPending}
      >
        {valuationMutation.isPending ? "Submitting..." : "Get Free Valuation"}
      </Button>
    </form>
  );
}

// Property Inquiry Form Component
export function PropertyInquiry({ propertyId, propertyTitle }: { propertyId: number; propertyTitle: string }) {
  const { toast } = useToast();
  
  const form = useForm<PropertyInquiryFormData>({
    resolver: zodResolver(propertyInquirySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: `I'm interested in the property: ${propertyTitle}`,
    },
  });

  const inquiryMutation = useMutation({
    mutationFn: async (data: PropertyInquiryFormData) => {
      return apiRequest("POST", "/api/leads", {
        ...data,
        leadSource: "property_inquiry",
        leadType: "property_interest",
        propertyInterest: `Property ID: ${propertyId} - ${propertyTitle}`,
      });
    },
    onSuccess: () => {
      form.reset();
      trackEvent('property_inquiry_submission', 'lead_generation', 'property_interest', propertyId);
      toast({
        title: "Inquiry Sent!",
        description: "We'll contact you about this property within 24 hours.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PropertyInquiryFormData) => {
    inquiryMutation.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="firstName">First Name *</Label>
        <Input
          id="firstName"
          {...form.register("firstName")}
          className="focus-ring"
        />
        {form.formState.errors.firstName && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.firstName.message}
          </p>
        )}
      </div>
      
      <div>
        <Label htmlFor="lastName">Last Name *</Label>
        <Input
          id="lastName"
          {...form.register("lastName")}
          className="focus-ring"
        />
        {form.formState.errors.lastName && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.lastName.message}
          </p>
        )}
      </div>
      
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          {...form.register("email")}
          className="focus-ring"
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>
      
      <div>
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          type="tel"
          {...form.register("phone")}
          className="focus-ring"
        />
        {form.formState.errors.phone && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.phone.message}
          </p>
        )}
      </div>
      
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          {...form.register("message")}
          rows={3}
          className="focus-ring"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-soft-blue text-white hover:bg-ocean-blue"
        disabled={inquiryMutation.isPending}
      >
        {inquiryMutation.isPending ? "Sending..." : "Send Inquiry"}
      </Button>
    </form>
  );
}

const LeadForms = {
  Contact,
  Consultation,
  HomeValuation,
  PropertyInquiry,
};

export default LeadForms;
