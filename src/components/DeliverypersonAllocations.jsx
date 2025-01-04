import React, { useState, useEffect } from 'react';
import { useAlloctedorderListQuery } from '../reduxServices/Apis/DeliveryPersonApi';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Collapse, IconButton, Button, Menu, MenuItem } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import 'tailwindcss/tailwind.css';

function DeliverypersonAllocations() {
  const dukandata = useSelector(state => state.dukandata);
  const { data, isSuccess, isLoading, refetch } = useAlloctedorderListQuery(dukandata.dukaanId);
  const [groupedOrders, setGroupedOrders] = useState([]);
  const [expandedPerson, setExpandedPerson] = useState(null);
  const [dateFilter, setDateFilter] = useState('today');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (data) {
      const filterData = (orders) => {
        const now = new Date();
        return orders.filter(order => {
          const orderDate = new Date(order.allocated_at);
          if (dateFilter === 'today') {
            return orderDate.toDateString() === now.toDateString();
          } else if (dateFilter === 'yesterday') {
            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            return orderDate.toDateString() === yesterday.toDateString();
          } else if (dateFilter === 'monthAgo') {
            const monthAgo = new Date(now);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return orderDate >= monthAgo;
          }
          return true;
        });
      };

      const grouped = data.reduce((acc, order) => {
        if (!acc[order.delivery_person_details.id]) {
          acc[order.delivery_person_details.id] = {
            person: order.delivery_person_details,
            orders: []
          };
        }
        acc[order.delivery_person_details.id].orders.push(order);
        return acc;
      }, {});
      
      const filteredGroupedOrders = Object.values(grouped).map(group => ({
        person: group.person,
        orders: filterData(group.orders)
      }));
      
      setGroupedOrders(filteredGroupedOrders);
    }
    refetch()
  }, [data, dateFilter]);

  const handleRowClick = (person) => {
    setExpandedPerson(expandedPerson === person ? null : person);
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterSelect = (filter) => {
    setDateFilter(filter);
    setAnchorEl(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Typography variant="h4" className="text-center mb-4 font-bold">
        Delivery Person Allocations
      </Typography>
      <div className="mb-4 text-center">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleFilterClick}
          variant="contained"
        >
          Filter by Date
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => handleFilterSelect('today')}>Today</MenuItem>
          <MenuItem onClick={() => handleFilterSelect('yesterday')}>Yesterday</MenuItem>
          <MenuItem onClick={() => handleFilterSelect('monthAgo')}>Month Ago</MenuItem>
        </Menu>
      </div>
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="font-bold">Delivery Person</TableCell>
              <TableCell className="font-bold">Contact</TableCell>
              <TableCell className="font-bold">Orders Assigned</TableCell>
              <TableCell className="font-bold">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupedOrders.map(({ person, orders }, index) => (
              <React.Fragment key={index}>
                <TableRow 
                  className="hover:bg-gray-50 cursor-pointer" 
                  onClick={() => handleRowClick(person)}
                >
                  <TableCell>{person.name}</TableCell>
                  <TableCell>{person.phone_number}</TableCell>
                  <TableCell>{orders.length}</TableCell>
                  <TableCell>
                    <IconButton>
                      {expandedPerson === person ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>
                    <Collapse in={expandedPerson === person} timeout="auto" unmountOnExit>
                      <div className="p-4 bg-gray-50 border-t border-gray-200">
                        {orders.map((order, orderIndex) => (
                          <div key={orderIndex} className="mb-2">
                            <Typography variant="body2">Sr No. {orderIndex + 1}</Typography>
                            <Typography variant="body2">Order ID: {order.order}</Typography>
                            <Typography variant="body2">Status: {order.status}</Typography>
                            <Typography variant="body2">Assigned Date: {new Date(order.allocated_at).toLocaleDateString()}</Typography>
                            {/* Add more details as needed */}
                          </div>
                        ))}
                      </div>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
            {!groupedOrders.length && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No allocated orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DeliverypersonAllocations;
