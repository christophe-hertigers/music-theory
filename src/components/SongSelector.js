import {useState, forwardRef, useImperativeHandle} from 'react';

const SongSelector = forwardRef(({songs, onChange}, ref) => {
    const [selected, setSelected] = useState('');

    const handleChange = (event) => {
        doChange(event.target.value);
    }

    const doChange = (title) => {
        setSelected(title);
        onChange?.(title);
    }

    const select = (target) => {
        const index = songs.map(song => song.title).indexOf(selected);
        switch(target) {
            case 'next': if (index + 1 < songs.length) doChange(songs[index+1].title); break;
            case 'prev': if (index - 1 >= 0) doChange(songs[index-1].title); break;
        }
    }

    useImperativeHandle(ref, () => ({

        handleKeyPressed: (key) => {
            switch(key) {
                case 'ArrowLeft': select('prev'); break;
                case 'ArrowRight': select('next'); break;
            }
        }

    }));

    return <select onChange={handleChange} value={selected}>
        <option value="">---</option>
        {songs?.map((song,i) => (
            <option key={i} value={song.title}>{song.title}</option>
        ))}
    </select>;
});

export default SongSelector;