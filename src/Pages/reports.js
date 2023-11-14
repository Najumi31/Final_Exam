import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import '../CSS/reports.css';
import { ReactComponent as HouseIcon } from 'bootstrap-icons/icons/house.svg';

const Reports = () => {
    return (
        <div>
          <div class="p-3 mb-2 bg-secondary bg-gradient text-white opacity-100">
              <div className="container d-flex justify-content-around align-items-start opacity-100" >
                <ButtonGroup>
                  <Button variant="secondary.bg-gradient" size="lg"><HouseIcon /> Home</Button>
                  <Button variant="secondary.bg-gradient" size="lg">Products</Button>
                  <Button variant="secondary.bg-gradient" size="lg">Stock</Button>
                  <Button variant="secondary.bg-gradient" size="lg">Transactions</Button>
                  <Button variant="secondary.bg-gradient" size="lg">Reports</Button>
                </ButtonGroup>
              </div>
          </div>
        </div>  
      );
     }

export default Reports;