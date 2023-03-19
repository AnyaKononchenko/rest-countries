import React, { useState } from "react";
import { useTheme } from "@mui/material";
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  IconButton,
  CardContent,
  Typography,
  CardActions,
  Collapse,
  Box,
  styled,
} from "@mui/material";
import { red } from "@mui/material/colors";
import {
  MdOutlineKeyboardArrowLeft,
  MdLocationPin,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectCountries,
  updateSavedCountry,
} from "../../features/countries/countriesSlice";
import { Country } from "../../types/countryType";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MapDialog from "../PopUps/MapDialog";
import { ExpandMoreProps } from "../../types/countryCardTypes";


const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
}));

const CountryCard = (props: { country: Country }) => {
  const { country } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  const neighbours = (neighbours: string[]) => {
    return neighbours
      .map(
        (neighbour) =>
          countries.find((country) => country.cca3 === neighbour)?.name.common
      )
      .join(", ");
  };

  const languages = (languages: Object) => {
    return Object.values(languages).join(", ");
  };

  const handleSaved = (country: Country) => {
    dispatch(updateSavedCountry(country));
  };

  return (
    <>
      {country && (
        <Box sx={{ minHeight: "82vh" }} className='country-details'>
          <Card
            sx={{
              maxWidth: "45vw",
              m: "1rem auto",
              bgcolor:
                theme.palette.mode === "light"
                  ? "primary.light"
                  : "primary.main",
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label='country literal'>
                  <CardMedia
                    component='img'
                    height='auto'
                    image={country.coatOfArms.png}
                    alt='country symbol'
                  />
                </Avatar>
              }
              title={country.name.common}
              subheader={country.capital}
            />
            <CardMedia
              sx={{
                p: "1rem",
                width: "90%",
                m: "0 auto",
              }}
              component='img'
              image={country.flags.png}
              alt={country.flags.alt}
            />
            <CardContent>
              <Typography variant='body2' color='text.primary' fontSize='1rem'>
                This country belongs to {country.region}
                {country.subregion
                  ? " and ".concat(country.subregion).concat(" sub-region")
                  : "."}
                . Located at the {country.latlng[0].toFixed(2)}&deg;N and{" "}
                {country.latlng[1].toFixed(2)}&deg;W, this country has
                population of {country.population}.{` `}
                {country.independent &&
                  country.name.common.concat(" is independent")}
                {country.unMember && " and has UN Membership."}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label='go back' onClick={() => navigate(-1)}>
                <MdOutlineKeyboardArrowLeft />
              </IconButton>
              <IconButton
                aria-label='location pin'
                onClick={() => setOpenDialog(true)}
              >
                <MdLocationPin />
              </IconButton>
              <IconButton
                aria-label='favourite'
                onClick={() => handleSaved(country)}
              >
                <FavoriteIcon
                  className='icon'
                  sx={{
                    color: country.isSaved ? "custom.main" : "primary.main",
                  }}
                ></FavoriteIcon>
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label='show more'
              >
                <MdOutlineKeyboardArrowDown />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <CardContent>
                <Box display='flex' flexDirection='column' gap='1rem'>
                  <Box display='flex' gap='.5rem'>
                    <Typography variant='body1' fontWeight={700}>
                      Official name:
                    </Typography>
                    <Typography variant='body1'>
                      {country.name.official}
                    </Typography>
                  </Box>
                  {country.languages && (
                    <Box display='flex' gap='.5rem'>
                      <Typography variant='body1' fontWeight={700}>
                        People here speak
                      </Typography>
                      <Typography variant='body1'>
                        {languages(country.languages)}.
                      </Typography>
                    </Box>
                  )}

                  {country.capital && (
                    <Box display='flex' gap='.5rem'>
                      <Typography variant='body1' fontWeight={700}>
                        Capital:{" "}
                      </Typography>
                      <Typography variant='body1'>
                        {country.capital}.
                      </Typography>
                    </Box>
                  )}

                  {country.capitalInfo.latlng && (
                    <Box display='flex' gap='.5rem'>
                      <Typography variant='body1' fontWeight={700}>
                        Location of the capital:
                      </Typography>
                      <Typography variant='body1'>
                        {country.capitalInfo.latlng[0].toFixed(2)}&deg;N and{" "}
                        {country.capitalInfo.latlng[1].toFixed(2)}&deg;W
                      </Typography>
                    </Box>
                  )}

                  <Box display='flex' gap='.5rem'>
                    <Typography variant='body1' fontWeight={700}>
                      Total area:{" "}
                    </Typography>
                    <Typography variant='body1'>{country.area}</Typography>
                  </Box>

                  {country.borders && (
                    <Box display='flex' gap='.5rem'>
                      <Typography variant='body1' fontWeight={700}>
                        Borders ({country.borders?.length} countries):
                      </Typography>
                      <Typography variant='body1'>
                        {neighbours(country.borders)}
                      </Typography>
                    </Box>
                  )}

                  <Box>
                    <Typography variant='body1' fontWeight={700}>
                      Good to know:
                    </Typography>
                    <Typography paragraph>
                      A week in {country.name.common} starts from{" "}
                      {capitalize(country.startOfWeek)}.{` `}
                      {country.demonyms?.eng.f &&
                        capitalize(country.demonyms?.eng.f)}{" "}
                      cars have "{country.car.signs}" sign and there is{" "}
                      {country.car.side}-hand traffic.
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Collapse>
          </Card>
          <MapDialog
            URL={country.maps.googleMaps}
            open={openDialog}
            setOpen={setOpenDialog}
          />
        </Box>
      )}
    </>
  );
};

export default CountryCard;
