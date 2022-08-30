import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import styled from 'styled-components';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { useRef } from 'react';

const Main = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    control,
    reset,
    clearErrors,
    watch,
    formState: { errors, dirtyFields, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const title = useWatch({ control, name: 'title' });
  const subtitle = useWatch({ control, name: 'subtitle' });
  const category = useWatch({ control, name: 'category' });
  const hexString = '0123456789abcdef';
  const [image, setImage] = useState<string | ArrayBuffer | null>('');
  const imageRef = useRef<HTMLInputElement>(null);

  const resetInput = () => {
    reset({ title: '', subtitle: '', category: '' });
  };

  const onClickRandomGradient = () => {
    let preview = document.getElementById('preview') as HTMLElement;
    let colorOne = randomColor();
    let colorTwo = randomColor();
    let angle = Math.floor(Math.random() * 360);
    preview.style.background = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
  };

  const onClickRandomColor = () => {
    let preview = document.getElementById('preview') as HTMLElement;
    let color = randomColor();
    preview.style.background = `${color}`;
  };

  const onClickRandomImage = async () => {
    let preview = document.getElementById('preview') as HTMLElement;
    fetch(`https://source.unsplash.com/random/?all`).then((response) => {
      preview.style.background = `url(${response.url})`;
    });
  };

  const onChangeImage = (fileBlob: any) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        let preview = document.getElementById('preview') as HTMLElement;

        const file = reader.result;
        console.log(file);

        preview.style.background = `url(${file})`;
        preview.style.backgroundSize = 'cover';

        setImage(file);

        resolve();
      };
    });
  };

  const onClickImageUploadButton = (event: any) => {
    imageRef!.current!.click();
  };

  const randomColor = () => {
    let hexCode = '#';
    for (var i = 0; i < 6; i++) {
      hexCode += hexString[Math.floor(Math.random() * hexString.length)];
    }
    return hexCode;
  };

  useEffect(() => {
    console.log(title);
  }, [title]);
  return (
    <Container>
      <Wrapper>
        <ServiceTitle>썸네일을 만들어보자</ServiceTitle>
        <Preview id='preview'>
          <Title>{title ? title : '제목을 입력해주세요'}</Title>
          <Divider />
          <Subtitle>{subtitle ? subtitle : '부제목을 입력해주세요'}</Subtitle>
          <Category>{category ? category : '분류도 입력해보세요'}</Category>
        </Preview>
        <RefreshContainer>
          <IconButton aria-label='refresh' sx={{ width: '30px', height: '30px', mt: 1 }}>
            <RefreshOutlinedIcon />
          </IconButton>
        </RefreshContainer>

        <InputContainer>
          <InputWrapper>
            <TitleInput
              type='text'
              value={title}
              onChange={(e) => {
                setValue('title', e.target.value, { shouldValidate: true, shouldDirty: true });
              }}
              placeholder='제목을 입력해주세요'
            />
            <TitleInput
              type='text'
              value={subtitle}
              onChange={(e) => {
                setValue('subtitle', e.target.value, { shouldValidate: true, shouldDirty: true });
              }}
              placeholder='부제목을 입력해주세요'
            />
            <TitleInput
              type='text'
              value={category}
              onChange={(e) => {
                setValue('category', e.target.value, { shouldValidate: true, shouldDirty: true });
              }}
              placeholder='분류도 입력해보실래요?'
            />
          </InputWrapper>
          <InputDivider />
          <SelectContainer>
            <SelectTitle>배경은 어떻게 하시겠어요?</SelectTitle>
            <ButtonWrapper>
              <SelectButton onClick={() => onClickRandomGradient()} type='button'>
                랜덤 그래디언트
              </SelectButton>
              <SelectButton onClick={() => onClickRandomColor()} type='button'>
                랜덤 단색
              </SelectButton>
              <SelectButton onClick={() => onClickRandomImage()} type='button'>
                랜덤 이미지
              </SelectButton>
              <input type='file' accept='image/*' multiple={false} ref={imageRef} style={{ display: 'none' }} onChange={(event: any) => onChangeImage(event.target.files[0])}></input>
              <SelectButton type='button' onClick={(event) => onClickImageUploadButton(event)}>
                이미지 업로드
              </SelectButton>
            </ButtonWrapper>
          </SelectContainer>
          <InputDivider />
          <SelectContainer>
            <SelectTitle>구성 요소는요?</SelectTitle>
          </SelectContainer>
          <InputDivider />
          <SelectContainer>
            <SelectTitle>텍스트에 효과는 어떠세요?</SelectTitle>
          </SelectContainer>
        </InputContainer>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px 0;
`;

const ServiceTitle = styled.div`
  font-size: 40px;
`;

const Wrapper = styled.div`
  width: 50%;
  height: 100%;

  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

const Preview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;
  width: 100%;
  height: 20vh;
  border: 1px solid #ccc;
  background: #000000;
`;

const RefreshContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;

  margin-top: 36px;

  width: 90%;

  font-size: 36px;
  color: #ffffff;
`;

const Divider = styled.div`
  width: 50%;
  height: 1px;
  background-color: #ffffff;
  margin-top: 12px;
  margin-bottom: 12px;
`;

const Subtitle = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 90%;
  font-size: 18px;
  color: #ffffff;
`;

const Category = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
  overflow: hidden;
  width: 90%;
  font-size: 13px;
  color: #ffffff;
`;

const InputContainer = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  margin-top: 48px;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 24px;
  padding-bottom: 24px;
`;

const TitleInput = styled.input`
  position: relative;
  width: 100%;
  height: 30px;
  font-size: 16px;
  font-weight: bold;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #aaa;
  &::placeholder {
    font-size: 16px;
  }
`;

const InputDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #cccccc;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const SelectContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 12px;
`;

const SelectTitle = styled.div`
  flex: 1;
  font-size: 20px;
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex: 3;

  gap: 16px;
`;

const SelectButton = styled.button`
  flex: 1;
  border: none;
  cursor: pointer;
  background-color: #99ff99;
  border-radius: 24px;
  height: 40px;

  &:hover {
    background-color: #66ff66;
  }
`;

export default Main;
