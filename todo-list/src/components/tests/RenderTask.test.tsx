import RenderTask from "../RenderTask"
import {fireEvent, render} from "@testing-library/react-native"
import * as todoModule from '../../hooks/useTodo'

describe('RenderTask component tests', ()=> {
    it("Should renders correctly", () => {
        const {debug, queryByTestId, queryByText} = render(
            <RenderTask 
                done={false} 
                id={0} 
                name="Task 1" 
                onEditPress={()=>{}} 
                onRemovePress={()=>{}} 
            />
        );
        debug()
        //verif si element present
        expect(queryByTestId("CARD_CONTAINER")).not.toBeNull()
        expect(queryByTestId("COLOR_BUTTON")).not.toBeNull()
        expect(queryByTestId("MODIFY_BUTTON")).not.toBeNull()
        expect(queryByTestId("DELETE_BUTTON")).not.toBeNull()
        expect(queryByText("Supprimer")).not.toBeNull()
        expect(queryByText("Modifier")).not.toBeNull()
            
        
    });
     it("Should change the button color when task is clicked ",  () => {
        const {debug, queryByTestId, getByTestId} = render(
            <RenderTask 
                done={false} 
                id={0} 
                name="Task 1" 
                onEditPress={()=>{}} 
                onRemovePress={()=>{}} 
            />
        );
        //verif si btn existe 
        expect(queryByTestId("COLOR_BUTTON")).not.toBeNull()
        //on recupere le btn
        const button = getByTestId("COLOR_BUTTON")
        //on click
        fireEvent.press(button)
        debug()
        
        expect(button.props.style).toHaveProperty('backgroundColor','transparent')
    })
    
    it("Should delete the task when button 'Supprimer' is cliked ", () => {
        //creation mock
        const onEditPressMock = jest.fn()
        const onRemovePressMock = jest.fn()
        const {debug, queryByTestId, getByTestId} = render(
            <RenderTask 
                done={false} 
                id={0} 
                name="Task 1" 
                onEditPress={onEditPressMock} 
                onRemovePress={onRemovePressMock} 
            />
        );
        //verification boutons existant pour appelers les fonctions
        expect(queryByTestId("MODIFY_BUTTON")).not.toBeNull()
        expect(queryByTestId("DELETE_BUTTON")).not.toBeNull()
        //si ils existent bien on les recupères
        const buttonModify = getByTestId("MODIFY_BUTTON")
        const buttonDelete = getByTestId("DELETE_BUTTON")
        //click des boutons
        fireEvent.press(buttonModify)
        fireEvent.press(buttonDelete)
        //verif si fonctions appelées
        expect(onEditPressMock).toHaveBeenCalledTimes(1)
        //ce test ne passe pas car erreur de conception
        expect(onRemovePressMock).toHaveBeenCalledTimes(1)

    }) 
    it("Should mock the tasks return by useTodo hook ",  () => {
        //quel module on va observer
        const removeTodoMock = jest.fn()
        jest.spyOn(todoModule, 'default').mockImplementation(()=> {
            return{
                addTask: jest.fn(),
                editTodo: jest.fn(),
                removeTodo: removeTodoMock,
                tasks: [
                    {done: false, id: 3, name: "mocked task"}
                ] as todoModule.Task[]
            } 
        });
        const {debug, queryByTestId, getByTestId} = render(
            <RenderTask 
                done={false} 
                id={0} 
                name="Task 1" 
                onEditPress={()=>{}} 
                onRemovePress={()=>{}} 
            />
        );
        expect(queryByTestId("DELETE_BUTTON")).not.toBeNull()
        fireEvent.press(getByTestId("DELETE_BUTTON"))
        expect(removeTodoMock).toHaveBeenCalled()

    })
});