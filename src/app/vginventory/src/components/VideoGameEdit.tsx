import React from 'react';
import { useUpdateVideoGame } from '../hooks/useUpdateVideoGame';

export const VideoGameEdit = (props: any) => {
    const { videogame, description, onDescriptionChange, onUpdate } = useUpdateVideoGame(props.location.state.game);
    
    return (
        <>
            <h1>{videogame.title}</h1>
            <form>
                <label>
                    Description:
                <textarea value={description} onChange={onDescriptionChange} />
                </label>
                <p><input type="submit" value="Update" onClick={onUpdate} /></p>
            </form>
        </>
    )
}