import styled from 'styled-components';

// Basic styled components using color names
const Button = styled.button`
  background-color: primary;
  color: Gray/50;
  border: 1px solid Blue/500;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  
  &:hover {
    background-color: Blue/600;
    border-color: Blue/700;
  }
  
  &:disabled {
    background-color: Gray/200;
    color: Gray/400;
    cursor: not-allowed;
  }
`;

const Card = styled.div`
  background: surface;
  color: text;
  border: 1px solid Gray/200;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px Gray/100;
  
  &:hover {
    box-shadow: 0 4px 8px Gray/200;
  }
`;

const Header = styled.header`
  background: Gray/800;
  color: Gray/50;
  padding: 16px 24px;
  border-bottom: 2px solid primary;
`;

const Alert = styled.div`
  padding: 12px 16px;
  border-radius: 4px;
  border: 1px solid;
  
  &.success {
    background: Green/50;
    color: Green/800;
    border-color: success;
  }
  
  &.error {
    background: Red/50;
    color: Red/800;
    border-color: error;
  }
  
  &.warning {
    background: Yellow/50;
    color: Yellow/800;
    border-color: warning;
  }
`;

// Dynamic styles
const DynamicButton = styled.button`
  background: ${props => props.variant === 'primary' ? 'primary' : 'secondary'};
  color: ${props => props.variant === 'primary' ? 'Gray/50' : 'Gray/800'};
  border: 1px solid ${props => props.variant === 'primary' ? 'Blue/500' : 'Gray/300'};
`;

export {
  Button,
  Card,
  Header,
  Alert,
  DynamicButton
}; 