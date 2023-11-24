import React, {useCallback, useMemo, useState} from 'react';
import FileUploader from "../../ui/fileUploader/FileUploader";
import {uploadFile} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {routes} from "../../routes";
import AppLoader from "../../ui/appLoader/AppLoader";
import {Typography, Grid} from "@mui/material";
import Input from "../../ui/input/Input";
import Button from "../../ui/button/Button";
import {getSummariesHistory} from "../../logic";
import SummaryItem from "../../components/summaryItem/SummaryItem";

const Main = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.main);
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const onChange = useCallback((files) => {
    dispatch(uploadFile(files[0]))
      .then((action) => {
        navigate(routes.summary + '/' + action.payload.id);
      });
  }, []);

  const onIdChange = useCallback((event) => {
    setId(event.target.value);
  }, [])

  const isIdDisabled = useMemo(() => {
    return isNaN(Number(id)) || id === '';
  }, [id]);

  const openSummary = useCallback(() => {
    navigate(routes.summary + '/' + id);
  }, [id]);

  const summaries = useMemo(() => {
    return getSummariesHistory();
  }, []);

  return (
    <>
      <Typography
        fontWeight={'1000'}
        fontSize={'25px'}
        userSelect={'none'}
        fontFamily={'Nunito'}
        color={'white'}
        mb={'var(--space-md)'}
      >
        Загрузите файл
      </Typography>
      <FileUploader
        onChange={onChange}
      />
      <Typography
        fontWeight={'1000'}
        fontSize={'25px'}
        userSelect={'none'}
        fontFamily={'Nunito'}
        color={'white'}
        mb={'var(--space-md)'}
        mt={'var(--space-md)'}
      >
        Откройте конспект по ID
      </Typography>
      <Grid mb={'var(--space-md)'}>
        <Input
          label={'ID конспекта'}
          fullWidth
          value={id}
          onChange={onIdChange}
        />
      </Grid>
      <Grid mb={'var(--space-md)'}>
        <Button variant={'filled'} disabled={isIdDisabled} onClick={openSummary}>
          Открыть конспект
        </Button>
      </Grid>
      <Typography
        fontWeight={'1000'}
        fontSize={'25px'}
        userSelect={'none'}
        fontFamily={'Nunito'}
        color={'white'}
        mb={'var(--space-md)'}
        mt={'var(--space-md)'}
      >
        Генирируемые конспекты
      </Typography>
      {!summaries?.length && <Typography
        fontWeight={'1000'}
        fontSize={'25px'}
        userSelect={'none'}
        fontFamily={'Nunito'}
        color={'var(--hint-color)'}
        mb={'var(--space-md)'}
      >
        Вы пока не загружали и не открывали конспекты
      </Typography>}
      {summaries?.length !== 0 && <>
        <Grid>
          {summaries.map((id) => (
            <Grid key={id} mb={'var(--space-sm)'}>
              <SummaryItem
                id={id}
              />
            </Grid>
          ))}
        </Grid>
      </>}
      <AppLoader loading={loading} />
    </>
  );
};

export default Main;