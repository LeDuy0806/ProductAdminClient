//Library
import { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery
} from '@mui/material';
import Header from 'src/components/Header';

//redux
import { useSelector } from 'react-redux';

//RTKQuery
import { useGetProductsQuery } from 'src/state/api';

//filter
import filter from 'lodash.filter';

const Product = ({
    id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    stat
}) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card
            sx={{
                backgroundImage: 'none',
                backgroundColor: theme.palette.background.alt,
                borderRadius: '0.55rem'
            }}
        >
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color={theme.palette.secondary[700]}
                    gutterBottom
                >
                    {category}
                </Typography>
                <Typography variant='h5' component='div'>
                    {name}
                </Typography>
                <Typography
                    sx={{ mb: '1.5rem' }}
                    color={theme.palette.secondary[400]}
                >
                    ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly />

                <Typography variant='body2'>{description}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant='primary'
                    size='small'
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    See More
                </Button>
            </CardActions>
            <Collapse
                in={isExpanded}
                timeout='auto'
                unmountOnExit
                sx={{
                    color: theme.palette.neutral[300]
                }}
            >
                <CardContent>
                    <Typography>id: {id}</Typography>
                    <Typography>Supply Left: {supply}</Typography>
                    <Typography>
                        Yearly Sales This Year: {stat.yearlySalesTotal}
                    </Typography>
                    <Typography>
                        Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

const Products = () => {
    const { data, isLoading } = useGetProductsQuery();
    const isNonMobile = useMediaQuery('(min-width: 1000px)');
    const search = useSelector((state) => state.search.search);

    const [filterUser, setFilterUser] = useState([]);

    useEffect(() => {
        const contains = ({ name, description, category }, query) => {
            if (
                name?.toLowerCase().includes(query) ||
                description?.toLowerCase().includes(query) ||
                category?.toLowerCase().includes(query)
            ) {
                return true;
            }
            return false;
        };

        const fotmatQuery = search?.toLowerCase();
        const filterData = filter(data, (user) => {
            return contains(user, fotmatQuery);
        });
        setFilterUser(filterData);
    }, [search]);

    return (
        <Box m='1.5rem 2.5rem'>
            <Header title='PRODUCTS' subtitle='See your list of products.' />
            {data || !isLoading ? (
                <Box
                    mt='20px'
                    display='grid'
                    gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                    justifyContent='space-between'
                    rowGap='20px'
                    columnGap='1.33%'
                    sx={{
                        '& > div': {
                            gridColumn: isNonMobile ? undefined : 'span 4'
                        }
                    }}
                >
                    {!search && data
                        ? data.map(
                              ({
                                  id,
                                  name,
                                  description,
                                  price,
                                  rating,
                                  category,
                                  supply,
                                  stat
                              }) => (
                                  <Product
                                      key={id}
                                      id={id}
                                      name={name}
                                      description={description}
                                      price={price}
                                      rating={rating}
                                      category={category}
                                      supply={supply}
                                      stat={stat}
                                  />
                              )
                          )
                        : filterUser.length !== 0
                        ? filterUser.map(
                              ({
                                  id,
                                  name,
                                  description,
                                  price,
                                  rating,
                                  category,
                                  supply,
                                  stat
                              }) => (
                                  <Product
                                      key={id}
                                      id={id}
                                      name={name}
                                      description={description}
                                      price={price}
                                      rating={rating}
                                      category={category}
                                      supply={supply}
                                      stat={stat}
                                  />
                              )
                          )
                        : []}
                </Box>
            ) : (
                <>Loading...</>
            )}
        </Box>
    );
};

export default Products;
