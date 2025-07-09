import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  height: 100vh;
  padding: 48px 24px;
  background: ${({ theme }) => theme.bgLight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
`;

const Wrapper = styled.div`
  max-width: 900px;
  width: 100%;
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  padding: 40px 48px;

  
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 36px;
  text-align: center;
  letter-spacing: 1.2px;
`;

const TutorialList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const TutorialCard = styled.div`
  border: 1px solid ${({ theme }) => theme.text_secondary + "25"};
  border-radius: 14px;
  padding: 28px 32px;
  background: ${({ theme }) => theme.bg};
  box-shadow: 0 6px 18px ${({ theme }) => theme.shadow + "20"};
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 10px 30px ${({ theme }) => theme.primary + "50"};
    transform: translateY(-6px);
  }
`;

const TutorialTitle = styled.h2`
  font-size: 22px;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 12px;
  font-weight: 600;
`;

const TutorialDescription = styled.p`
  font-size: 17px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.65;
  margin-bottom: 22px;
  font-weight: 400;
`;

const ReadMoreBtn = styled.button`
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 14px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  box-shadow: 0 6px 16px ${({ theme }) => theme.primary + "60"};
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
    box-shadow: 0 8px 20px ${({ theme }) => theme.secondary + "80"};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.secondary + "AA"};
  }
`;

const tutorialsData = [
  {
    id: 1,
    title: "Beginner's Guide to Gym Workouts",
    description: "Learn the basics of gym workouts including warm-ups, core exercises, and cooldowns to build a strong foundation.",
  },
  {
    id: 2,
    title: "Strength Training for Muscle Gain",
    description: "Step-by-step tutorials on strength training techniques focused on hypertrophy and progressive overload.",
  },
  {
    id: 3,
    title: "Proper Nutrition for Fitness",
    description: "Understand how nutrition plays a key role in fitness success, with tips on meal planning and supplements.",
  },
  {
    id: 4,
    title: "Cardio Workouts for Fat Loss",
    description: "Effective cardio routines and tips to help you burn fat and improve cardiovascular health.",
  },
  {
    id: 5,
    title: "Preventing Injuries in the Gym",
    description: "Learn how to avoid common gym injuries with proper form, rest, and recovery techniques.",
  },
];

const TutorialsPage = () => {
  const handleReadMore = (id) => {
    alert(`Read more clicked for tutorial ID: ${id}`);
    // Replace alert with routing to tutorial detail page if needed
  };

  return (
    <Container>
      <Wrapper>
        <Title>Gym Tutorials</Title>
        <TutorialList>
          {tutorialsData.map(({ id, title, description }) => (
            <TutorialCard key={id}>
              <TutorialTitle>{title}</TutorialTitle>
              <TutorialDescription>{description}</TutorialDescription>
              <ReadMoreBtn onClick={() => handleReadMore(id)}>Read More</ReadMoreBtn>
            </TutorialCard>
          ))}
        </TutorialList>
      </Wrapper>
    </Container>
  );
};

export default TutorialsPage;
