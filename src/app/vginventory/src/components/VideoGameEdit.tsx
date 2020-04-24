import React from 'react';
import { useUpdateVideoGame } from '../hooks/useUpdateVideoGame';

export const VideoGameEdit = (props: any) => {
    const { videogame, description, onDescriptionChange, onUpdate } = useUpdateVideoGame(props.game);
    
    return (
        <>
            <h1>{videogame.title}</h1>
            <form>
                <label>
                    Description:
                <textarea onChange={onDescriptionChange}>{description}</textarea>
                </label>
                <p><input type="submit" value="Update" onClick={onUpdate} /></p>
            </form>
        </>
    )
}