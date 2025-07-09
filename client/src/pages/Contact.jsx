import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  height: 100%;
  padding: 40px 16px;
  background: ${({ theme }) => theme.bgLight};
  display: flex;
  justify-content: center;
  overflow-y: auto;
`;

const Wrapper = styled.div`
  max-width: 800px;
  width: 100%;
  background: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 16px ${({ theme }) => theme.shadow};
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 24px;
  text-align: center;
`;

const Info = styled.div`
  margin-bottom: 32px;
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
`;

const InfoItem = styled.div`
  margin-bottom: 12px;
`;

const Label = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.text_secondary + "80"};
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.text_secondary + "80"};
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  min-height: 120px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Button = styled.button`
  padding: 14px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const ContactInfo = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert(`Thank you, ${formData.name}! Your message has been sent.`);
      setFormData({ name: "", email: "", message: "" });
      setSubmitting(false);
    }, 1500);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact Info</Title>
        <Info>
          <InfoItem>
            <Label>Address:</Label> 123 Fitness Ave, Workout City, Fitland
          </InfoItem>
          <InfoItem>
            <Label>Phone:</Label> +91 98765 43210
          </InfoItem>
          <InfoItem>
            <Label>Email:</Label> support@gymfit.com
          </InfoItem>
          <InfoItem>
            <Label>Website:</Label> www.gymfit.com
          </InfoItem>
        </Info>

        <form onSubmit={handleSubmit}>
          <Form>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={submitting}
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={submitting}
            />
            <TextArea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={submitting}
            />
            <Button type="submit" disabled={submitting}>
              {submitting ? "Sending..." : "Send Message"}
            </Button>
          </Form>
        </form>
      </Wrapper>
    </Container>
  );
};

export default ContactInfo;
