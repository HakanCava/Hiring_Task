import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import Page from '../../app/page'


  

describe('Get Home Page',()=>{
    it('Should render properly',()=>{
       render(<Page />)
       const heading = screen.getByTestId('heading')
       expect(heading).toHaveTextContent("Hiring Map :)")
    })
})