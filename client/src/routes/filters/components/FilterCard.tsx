import { Filter as FilterType } from "../utils/types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

interface CardFilterProps {
  filter: FilterType;
}

export default function CardFilter({ filter }: CardFilterProps) {
  return (
    <Card sx={{height: 150}}>
      <CardContent>
        <Typography sx={{ fontSize: 20 }}>{filter.name}</Typography>
        <Typography color="text.secondary" variant="body2">{filter.description}</Typography>
      </CardContent>
    </Card>
  );
}
