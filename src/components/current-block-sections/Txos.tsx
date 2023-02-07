import {
    Typography,
    CardContent,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow
} from "@mui/material";
import { StyledCard } from "pages/CurrentBlock";
import CopyableField from "components/CopyableField";
import { Block, BurnTx, TxOut } from "api/types";
import { getTokenAmount, TOKENS } from "utils/tokens";

export default function Txos({ blockContents, burns }: { blockContents: Block; burns: BurnTx[] }) {
    if (!blockContents.outputs.length) {
        return null;
    }

    function RenderOutput({ txout }: { txout: TxOut }) {
        const matchingBurn = burns.find((burn) => burn.publicKeyHex === txout.publicKey);

        if (matchingBurn) {
            return (
                <TableRow>
                    <TableCell>{txout.publicKey}</TableCell>
                    <TableCell>
                        <Typography>Burn</Typography>
                    </TableCell>
                    <TableCell>
                        <>
                            {getTokenAmount(matchingBurn.tokenId, matchingBurn.amount)}
                            &nbsp;
                            {TOKENS[matchingBurn.tokenId].name}
                        </>
                    </TableCell>
                </TableRow>
            );
        }

        return (
            <TableRow>
                <TableCell>{txout.publicKey}</TableCell>
                <TableCell>
                    <CopyableField text={txout.targetKey} />
                </TableCell>
                <TableCell>
                    {txout.maskedAmount ? (
                        <CopyableField text={txout.maskedAmount.maskedValue.toString()} />
                    ) : (
                        "not available"
                    )}
                </TableCell>
            </TableRow>
        );
    }

    return (
        <StyledCard>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Transaction Outputs
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>TXO Public Key</TableCell>
                                <TableCell>Target Address</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {blockContents.outputs.map((txout) => (
                                <RenderOutput txout={txout} key={txout.publicKey} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </StyledCard>
    );
}
