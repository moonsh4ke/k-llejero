import { Box, Chip } from "@mui/material";
import { Keyword } from "../utils/types";
import { styled } from '@mui/material/styles';

interface KeywordsProps {
  keywords: Keyword[];
  setKeywords?: any;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function Keywords({ keywords, setKeywords }: KeywordsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {keywords.map((key) => {
        return (
          <ListItem key={key.id}>
            <Chip label={key.value} onDelete={setKeywords? () => {
              setKeywords(keywords.filter((k) => k.id != key.id ))
            } : undefined} />
          </ListItem>
        )
      })}
    </Box>
  );
}
