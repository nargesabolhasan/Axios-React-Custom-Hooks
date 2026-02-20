import { Button, CardActions, CircularProgress, Grid2 } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import CardComponent from "../components/cards";
import { productsFetch } from "../constant/api";
import { INFO_RAW_ROUTE } from "../constant/routes";
import useAxios from "../hooks/useAxios";
import { addItem } from "../store/actions/shopAction";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { responseData: cardList, startRequest, loading } = useAxios();

  const handleShop = (e, cardInfo) => {
    dispatch(addItem(cardInfo));
  };

  const fetchProducts = async () => {
    await startRequest({
      url: productsFetch,
    });
  };

  useEffect(() => {
    fetchProducts().then();
  }, []);

  return (
    <Grid2 container spacing={2} className="w-full">
      {loading || !cardList ? (
        <div className="w-full h-full flex justify-center items-center">
          <CircularProgress size="3rem" />
        </div>
      ) : (
        <>
          {cardList?.length !== 0 ? (
            <>
              {cardList.map((item) => (
                <CardComponent info={item} key={item?.id}>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={(e) => handleShop(e, item)}
                      variant="outlined"
                      data_id_item={item?.id}
                    >
                      Shop
                    </Button>
                    <Button
                      size="small"
                      onClick={(e) => navigate(`${INFO_RAW_ROUTE}/${item?.id}`)}
                      variant="contained"
                    >
                      More Information
                    </Button>
                  </CardActions>
                </CardComponent>
              ))}
            </>
          ) : (
            <>empty list !!</>
          )}
        </>
      )}
    </Grid2>
  );
};

export default Home;
