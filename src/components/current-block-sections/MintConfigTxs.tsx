import {
    Typography,
    CardContent,
    Table,
    TableHead,
    TableContainer,
    TableBody,
    TableCell,
    TableRow,
    Grid
} from "@mui/material";

import { StyledCard } from "pages/CurrentBlock";
import { MintInfoResponse } from "api/types";
import { TOKENS } from "utils/tokens";
import CopyableField from "components/CopyableField";
import MintConfig from "components/current-block-sections/MintConfig";

export default function MintConfigTxs({ mintInfo }: { mintInfo: MintInfoResponse }) {
    if (!mintInfo.mintConfigTxs.length) {
        return null;
    }

    return (
        <Grid item xs={12}>
            <StyledCard>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Mint Config Txs
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Mint Limit</TableCell>
                                    <TableCell>Token</TableCell>
                                    <TableCell>Nonce</TableCell>
                                    <TableCell>Mint Configs</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mintInfo.mintConfigTxs.map((mintConfigTx) => (
                                    <TableRow key={mintConfigTx.mintConfigTx.nonceHex}>
                                        <TableCell>
                                            {mintConfigTx.mintConfigTx.totalMintLimit.toLocaleString(
                                                "en-US"
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {TOKENS[mintConfigTx.mintConfigTx.tokenId].name}
                                        </TableCell>
                                        <TableCell>
                                            <CopyableField
                                                text={mintConfigTx.mintConfigTx.nonceHex}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {mintConfigTx.mintConfigs.map((config, i) => (
                                                <MintConfig
                                                    config={config}
                                                    key={`configTxconfig-${i}`}
                                                />
                                            ))}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </StyledCard>
        </Grid>
    );
}
