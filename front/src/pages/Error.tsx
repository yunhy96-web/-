import styled from "@emotion/styled";
import { Icon } from "../assets";
import Button from "../components/_common/Button";
import { NextButton } from "../components/_common/Funnel/style";

export const Error = ({ error, resetErrorBoundary }: any) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: 150,
        }}
      >
        <Icon.Error />
        <div style={{ height: 24 }}></div>
        <Text>알 수 없는 이유로 에러가 발생했습니다.</Text>
        <div style={{ height: 12 }}></div>
        <Text>다시 시도해주세요.</Text>
      </div>
      <NextButton>
        <Button
          onClick={() => (window.location.href = "/mySchedule")}
          text="메인으로 돌아가기"
        />
      </NextButton>
    </>
  );
};

const Text = styled.div`
  ${({ theme }) => theme.font.heading_1}
`;
