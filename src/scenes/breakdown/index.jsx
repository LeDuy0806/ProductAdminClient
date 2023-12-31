//Library
import { Box } from '@mui/material';

//component
import Header from 'src/components/Header';
import BreakdownChart from 'src/components/BreakdownChart';

const Breakdown = () => {
    return (
        <Box m='1.5rem 2.5rem'>
            <Header
                title='BREAKDOWN'
                subtitle='Breakdown of Sales By Category'
            />
            <Box mt='40px' height='75vh'>
                <BreakdownChart />
            </Box>
        </Box>
    );
};

export default Breakdown;
